const form = document.getElementById("myForm");

let wrongAttempts = 0;
let isLocked = false;

// Submit Event
form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Clear previous messages
    clearErrors();

    if (isLocked) {
        document.getElementById("passwordError").innerHTML =
            "Password is locked. Try again after 1 minute.";
        return;
    }

    // Input Values
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let department = document.getElementById("department");
    let address = document.getElementById("address");

    let gender = document.querySelector('input[name="gender"]:checked');
    let skills = document.querySelectorAll('input[name="skill"]:checked');

    let valid = true;

    // ------------------------
    // Name Validation
    // ------------------------

    if (name.value.trim() == "") {

        showError(name, "nameError", "Name is required.");
        valid = false;

    }
    else if (!/^[A-Za-z ]+$/.test(name.value.trim())) {

        showError(name, "nameError", "Only letters are allowed.");
        valid = false;

    }
    else {

        showSuccess(name);

    }

    // ------------------------
    // Email Validation
    // ------------------------

    if (email.value.trim() == "") {

        showError(email, "emailError", "Email is required.");
        valid = false;

    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {

        showError(email, "emailError", "Invalid email address.");
        valid = false;

    }
    else {

        showSuccess(email);

    }

    // ------------------------
    // Password Validation
    // Correct Password = CSE123
    // ------------------------

    if (password.value == "") {

        showError(password, "passwordError", "Password is required.");
        valid = false;

    }
    else if (password.value != "CSE123") {

        wrongAttempts++;

        showError(
            password,
            "passwordError",
            "Wrong Password! Attempt " + wrongAttempts + " of 3."
        );

        valid = false;

        if (wrongAttempts >= 3) {

            isLocked = true;

            document.getElementById("passwordError").innerHTML =
                "Too many wrong attempts. Password locked for 1 minute.";

            password.disabled = true;

            setTimeout(function () {

                isLocked = false;
                wrongAttempts = 0;
                password.disabled = false;

                document.getElementById("passwordError").innerHTML =
                    "Password unlocked. Try again.";

            }, 60000);

        }

    }
    else {

        wrongAttempts = 0;
        showSuccess(password);

    }

    // ------------------------
    // Gender Validation
    // ------------------------

    if (gender == null) {

        document.getElementById("genderError").innerHTML =
            "Please select your gender.";

        valid = false;

    }

    // ------------------------
    // Department Validation
    // ------------------------

    if (department.value == "") {

        showError(
            department,
            "departmentError",
            "Please select a department."
        );

        valid = false;

    }
    else {

        showSuccess(department);

    }

    // ------------------------
    // Checkbox Validation
    // ------------------------

    if (skills.length == 0) {

        document.getElementById("skillError").innerHTML =
            "Select at least one skill.";

        valid = false;

    }

    // ------------------------
    // Address Validation
    // ------------------------

    if (address.value.trim() == "") {

        showError(address, "addressError", "Address is required.");
        valid = false;

    }
    else if (address.value.trim().length < 10) {

        showError(
            address,
            "addressError",
            "Address must be at least 10 characters."
        );

        valid = false;

    }
    else {

        showSuccess(address);

    }

    // ------------------------
    // Success
    // ------------------------

    if (valid) {

        alert("Form Submitted Successfully!");

        form.reset();

        clearErrors();

    }

});

// ==========================
// Functions
// ==========================

// Show Error
function showError(input, errorId, message) {

    input.classList.add("errorBorder");
    input.classList.remove("successBorder");

    document.getElementById(errorId).innerHTML = message;

}

// Show Success
function showSuccess(input) {

    input.classList.remove("errorBorder");
    input.classList.add("successBorder");

}

// Clear All Errors
function clearErrors() {

    let errors = document.querySelectorAll(".error");

    errors.forEach(function (item) {

        item.innerHTML = "";

    });

    let fields = document.querySelectorAll("input, select, textarea");

    fields.forEach(function (field) {

        field.classList.remove("errorBorder");
        field.classList.remove("successBorder");

    });

}