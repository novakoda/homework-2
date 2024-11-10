// Program name: index.html
// Author: James Williams
// Date created: 9/16/24
// Date last edited: 11/09/24
// Version: 2.2
// Description: A patient signup form for Kelsey-Seybold Clinic

function updateHeaderWithDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const day = days[today.getDay()];
    const date = today.toLocaleDateString(); // Format: MM/DD/YYYY

    // Update the p element with the current day and date
    document.getElementById('header-date').innerText = `${day}, ${date}`;
}

function validateForm() {
    let isValid = true;
    const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    // Special validations
    if (!validatePasswordMatch(document.querySelector('input[name="repassword"]'))) {
        isValid = false;
    }

    if (!validateDOB(document.querySelector('input[name="dob"]'))) {
        isValid = false;
    }

    return isValid;
}

function validateField(input) {
    const errorDiv = input.nextElementSibling?.classList.contains('error-message')
        ? input.nextElementSibling
        : document.createElement('span');

    errorDiv.classList.add('error-message');

    if (input.validity.patternMismatch || input.validity.valueMissing || input.validity.tooShort) {
        input.classList.add('error');
        errorDiv.textContent = input.title;
        if (!input.nextElementSibling?.classList.contains('error-message')) {
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
        return false;
    } else {
        input.classList.remove('error');
        errorDiv.remove();
        return true;
    }
}

function validatePasswordMatch(input) {
    const password = document.querySelector('input[name="password"]').value;
    const errorDiv = input.nextElementSibling?.classList.contains('error-message')
        ? input.nextElementSibling
        : document.createElement('span');

    errorDiv.classList.add('error-message');

    if (input.value !== password) {
        input.setCustomValidity('Passwords must match');
        input.classList.add('error');
        errorDiv.textContent = 'Passwords must match';
        if (!input.nextElementSibling?.classList.contains('error-message')) {
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
        return false;
    } else {
        input.setCustomValidity('');
        input.classList.remove('error');
        errorDiv.remove();
        return true;
    }
}

function validateDOB(input) {
    let dateStr = input.value;
    let parts = dateStr.split('/');
    const errorDiv = input.nextElementSibling?.classList.contains('error-message')
        ? input.nextElementSibling
        : document.createElement('span');

    errorDiv.classList.add('error-message');

    if (parts.length === 3) {
        let month = parseInt(parts[0]);
        let day = parseInt(parts[1]);
        let year = parseInt(parts[2]);

        // Check month range
        if (month < 1 || month > 12) {
            input.setCustomValidity("Month must be between 1 and 12");
            input.classList.add('error');
            errorDiv.textContent = "Month must be between 1 and 12";
            if (!input.nextElementSibling?.classList.contains('error-message')) {
                input.parentNode.insertBefore(errorDiv, input.nextSibling);
            }
            return false;
        }

        // Check days per month
        let daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) {
            let message = `Invalid day for ${month}/${year}. This month has ${daysInMonth} days.`;
            input.setCustomValidity(message);
            input.classList.add('error');
            errorDiv.textContent = message;
            if (!input.nextElementSibling?.classList.contains('error-message')) {
                input.parentNode.insertBefore(errorDiv, input.nextSibling);
            }
            return false;
        }

        let inputDate = new Date(year, month - 1, day);
        let today = new Date();
        let isValidDate = inputDate.getMonth() === month - 1 && inputDate.getDate() === day && inputDate.getFullYear() === year;
        let isNotFuture = inputDate <= today;

        if (!isValidDate) {
            input.setCustomValidity("Please enter a valid date");
            input.classList.add('error');
            errorDiv.textContent = "Please enter a valid date";
            if (!input.nextElementSibling?.classList.contains('error-message')) {
                input.parentNode.insertBefore(errorDiv, input.nextSibling);
            }
            return false;
        }

        if (!isNotFuture) {
            input.setCustomValidity("Date cannot be in the future");
            input.classList.add('error');
            errorDiv.textContent = "Date cannot be in the future";
            if (!input.nextElementSibling?.classList.contains('error-message')) {
                input.parentNode.insertBefore(errorDiv, input.nextSibling);
            }
            return false;
        }

        let maxAge = new Date();
        maxAge.setFullYear(today.getFullYear() - 120);
        if (inputDate < maxAge) {
            input.setCustomValidity("Date cannot be more than 120 years ago");
            input.classList.add('error');
            errorDiv.textContent = "Date cannot be more than 120 years ago";
            if (!input.nextElementSibling?.classList.contains('error-message')) {
                input.parentNode.insertBefore(errorDiv, input.nextSibling);
            }
            return false;
        }

        input.setCustomValidity("");
        input.classList.remove('error');
        errorDiv.remove();
        return true;
    }

    input.setCustomValidity("Please use MM/DD/YYYY format");
    input.classList.add('error');
    errorDiv.textContent = "Please use MM/DD/YYYY format";
    if (!input.nextElementSibling?.classList.contains('error-message')) {
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    return false;
}

function formatDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 4) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4) + '/' + value.substring(4, 8);
    } else if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    input.value = value;
}

function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    let displayValue = '';

    if (value.length >= 3) {
        displayValue += '(' + value.substr(0,3) + ')';
    } else {
        displayValue += value;
    }

    if (value.length >= 6) {
        displayValue += value.substr(3,3) + '-';
    } else if (value.length > 3) {
        displayValue += value.substr(3);
    }

    if (value.length > 6) {
        displayValue += value.substr(6);
    }

    input.value = displayValue;
}

function formatSSN(input) {
    let value = input.value.replace(/\D/g, '').slice(0, 9);
    let displayValue = '';

    // Format with dashes and X's for display based on actual input length
    if (value.length > 0) {
        for (let i = 0; i < value.length; i++) {
            if (i === 3 || i === 5) {
                displayValue += '-';
            }
            displayValue += 'X';
        }
    }

    // Store raw digits for validation
    input.dataset.ssn = value;

    // Set formatted value with dashes based on actual input length
    if (value.length > 3) {
        value = value.substr(0,3) + '-' + value.substr(3);
    }
    if (value.length > 6) {
        value = value.substr(0,6) + '-' + value.substr(6);
    }

    input.value = value;
    document.getElementById('ssnMask').textContent = displayValue;
}

function reviewForm() {
    const form = document.querySelector('form');
    const reviewContent = document.getElementById('reviewContent');
    let reviewHTML = '';

    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];

        // Only show checkboxes and radios if they are checked
        if (element.type === 'checkbox' || element.type === 'radio') {
            if (element.checked && element.name) {
                reviewHTML += `<p><strong>${element.name}:</strong> ${element.value}</p>`;
            }
        }
        // Show other input types if they have both name and value
        else if (element.name && element.value.trim()) {
            reviewHTML += `<p><strong>${element.name}:</strong> ${element.value}</p>`;
        }
    }

    reviewContent.innerHTML = reviewHTML;
    document.getElementById('reviewArea').style.display = 'block';
}


function submitForm() {
    if (validateForm()) {
        document.querySelector('form').submit();
    }
}

function startOver() {
    document.querySelector('form').reset();
    document.getElementById('reviewArea').style.display = 'none';
}

function validateForm() {
    let isValid = true;
    const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');

    // Validate all required fields
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    // Email validation
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        const errorDiv = createOrGetErrorDiv(email);
        email.classList.add('error');
        errorDiv.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // Password validations
    const password = document.querySelector('input[name="password"]');
    const repassword = document.querySelector('input[name="repassword"]');
    const userID = document.querySelector('input[name="userID"]');

    // Check if password contains userID
    if (password.value.toLowerCase().includes(userID.value.toLowerCase())) {
        const errorDiv = createOrGetErrorDiv(password);
        password.classList.add('error');
        errorDiv.textContent = "Password cannot contain your user ID.";
        isValid = false;
    }

    // Check password match
    if (!validatePasswordMatch(repassword)) {
        isValid = false;
    }

    // Date of Birth validation
    const dob = document.querySelector('input[name="dob"]');
    if (!validateDOB(dob)) {
        isValid = false;
    }

    return isValid;
}

function createOrGetErrorDiv(input) {
    let errorDiv = input.nextElementSibling;
    if (!errorDiv?.classList.contains('error-message')) {
        errorDiv = document.createElement('span');
        errorDiv.classList.add('error-message');
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    return errorDiv;
}

function setupSalarySlider() {
    const slider = document.getElementById('salarySlider');
    const output = document.getElementById('salaryValue');
    output.innerHTML = formatSalary(slider.value);

    slider.oninput = function() {
        output.innerHTML = formatSalary(this.value);
    }
}

function formatSalary(value) {
    return '$' + Number(value).toLocaleString() + '/year';
}

// Call the functions once the page is loaded
window.onload = function() {
    updateHeaderWithDate();
    setupSalarySlider();
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input, select, textarea');
    const dobInput = document.querySelector('input[name="dob"]');
    const emailInput = document.getElementById('email');

    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => validateField(input));
    });

    dobInput.addEventListener('input', () => validateDOB(dobInput));
    dobInput.addEventListener('blur', () => validateDOB(dobInput));
    emailInput.addEventListener('input', function() {
        validateField(this);
    });

    const repasswordInput = document.querySelector('input[name="repassword"]');
    repasswordInput.addEventListener('input', function() {
        const password = document.querySelector('input[name="password"]').value;
        const errorDiv = this.nextElementSibling?.classList.contains('error-message')
            ? this.nextElementSibling
            : document.createElement('span');

        errorDiv.classList.add('error-message');

        if (this.value !== password) {
            this.classList.add('error');
            errorDiv.textContent = 'Passwords must match';
            if (!this.nextElementSibling?.classList.contains('error-message')) {
                this.parentNode.insertBefore(errorDiv, this.nextSibling);
            }
        } else {
            this.classList.remove('error');
            errorDiv.remove();
        }
    });
});

