// Program name: index.html
// Author: James Williams
// Date created: 9/16/24
// Date last edited: 9/21/24
// Version: 1.7
// Description: A patient signup form for Kelsey-Seybold Clinic

function updateHeaderWithDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const day = days[today.getDay()];
    const date = today.toLocaleDateString(); // Format: MM/DD/YYYY

    // Update the p element with the current day and date
    document.getElementById('header-date').innerText = `${day}, ${date}`;
}

// Function to validate the email and dob format
function validateForm() {
    const userID = document.getElementById('userID').value;
    const userIDPattern = /^[a-zA-Z][a-zA-Z0-9_-]{4,29}$/;
    if (!userIDPattern.test(userID)) {
        alert('Please enter a valid User ID.');
        return false;
    }
    // ... other validation checks ...
    return true;
}

function validateForm() {
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false; // Prevent form submission
    }

    const userID = document.getElementById('userID').value;
    const userIDPattern = /^[a-zA-Z][a-zA-Z0-9_-]{4,29}$/;
    if (!userIDPattern.test(userID)) {
        alert('Please enter a valid User ID.');
        return false;
    }

    const dob =  document.getElementById('dob');
    validateDOB(dob);
    if (dob.value === "") {
        return false;
    }

    return true;
}

function validateDOB(input) {
    const dob = new Date(input.value);
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);

    if (dob > today) {
        alert("Date of birth cannot be in the future.");
        input.value = '';
    } else if (dob < minDate) {
        alert("Date of birth cannot be more than 120 years ago.");
        input.value = '';
    }
}

function reviewForm() {
    const form = document.querySelector('form');
    const reviewContent = document.getElementById('reviewContent');
    let reviewHTML = '';

    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        if (element.name && element.value) {
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
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password = document.querySelector('input[name="password"]').value;
    const repassword = document.querySelector('input[name="repassword"]').value;
    const userID = document.querySelector('input[name="userID"]').value;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (password !== repassword) {
        alert("Passwords do not match.");
        return false;
    }

    if (password.toLowerCase().includes(userID.toLowerCase())) {
        alert("Password cannot contain your user ID.");
        return false;
    }

    return true;
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
