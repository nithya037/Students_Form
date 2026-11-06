// Select HTML elements using getElementById()

var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var bioInput = document.getElementById("bio");

var nameError = document.getElementById("nameError");
var emailError = document.getElementById("emailError");
var passwordError = document.getElementById("passwordError");
var bioError = document.getElementById("bioError");

var bioCounter = document.getElementById("bioCounter");
var submitButton = document.getElementById("submitButton");
var successMessage = document.getElementById("successMessage");
var detailsTable = document.getElementById("detailsTable");
var form = document.getElementById("registrationForm");

// This function checks all four fields.
function validateForm() {
    var isNameValid = false;
    var isEmailValid = false;
    var isPasswordValid = false;
    var isBioValid = false;

    // Name validation
    if (nameInput.value.trim() == "") {
        nameError.textContent = "Please enter your name.";
    } else {
        nameError.textContent = "";
        isNameValid = true;
    }

    // Basic email validation
    if (emailInput.value.trim() == "") {
        emailError.textContent = "Please enter your email.";
    } else if (emailInput.value.includes("@") == false || emailInput.value.includes(".") == false) {
        emailError.textContent = "Please enter a valid email address.";
    } else {
        emailError.textContent = "";
        isEmailValid = true;
    }

    // Password validation
    if (passwordInput.value == "") {
        passwordError.textContent = "Please enter your password.";
    } else if (passwordInput.value.length < 6) {
        passwordError.textContent = "Password must contain at least 6 characters.";
    } else {
        passwordError.textContent = "";
        isPasswordValid = true;
    }

    // Bio validation
    if (bioInput.value.trim() == "") {
        bioError.textContent = "Please enter your bio.";
    } else {
        bioError.textContent = "";
        isBioValid = true;
    }

    // Enable Submit only when all fields are valid
    if (isNameValid && isEmailValid && isPasswordValid && isBioValid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// Real-time validation using input events
nameInput.addEventListener("input", function() {
    validateForm();
    successMessage.textContent = "";
});

emailInput.addEventListener("input", function() {
    validateForm();
    successMessage.textContent = "";
});

passwordInput.addEventListener("input", function() {
    validateForm();
    successMessage.textContent = "";
});

bioInput.addEventListener("input", function() {
    // Update the character counter
    bioCounter.textContent = bioInput.value.length + " / 200 characters";

    validateForm();
    successMessage.textContent = "";
});

// Prevent form submission when the fields are invalid
form.addEventListener("submit", function(event) {
    event.preventDefault();

    validateForm();

    if (submitButton.disabled == false) {
        // Create a new table row
        var row = document.createElement("tr");

        var nameCell = document.createElement("td");
        nameCell.textContent = nameInput.value;

        var emailCell = document.createElement("td");
        emailCell.textContent = emailInput.value;

        var bioCell = document.createElement("td");
        bioCell.textContent = bioInput.value;

        var actionCell = document.createElement("td");
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("deleteButton");

        // Delete the selected row
        deleteButton.addEventListener("click", function() {
            row.remove();
        });

        actionCell.append(deleteButton);

        row.append(nameCell);
        row.append(emailCell);
        row.append(bioCell);
        row.append(actionCell);

        detailsTable.append(row);

        successMessage.textContent = "Details saved successfully!";

        form.reset();
        bioCounter.textContent = "0 / 200 characters";
        submitButton.disabled = true;
        validateForm();
    }
});
