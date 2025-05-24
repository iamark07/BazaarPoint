document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const inquiryForm = document.querySelector("#inquiry_form form");
    const name = document.querySelector(".inquiry-name");
    const email = document.querySelector(".inquiry-email");
    const phone = document.querySelector(".inquiry-phone");
    const message = document.querySelector(".inquiry-message");
    const errorName = document.querySelector(".inquiry-error-name");
    const errorEmail = document.querySelector(".inquiry-error-email");
    const errorPhone = document.querySelector(".inquiry-error-phone");
    const errorMessage = document.querySelector(".inquiry-error-message");
    const successMessage = document.getElementById("success_contact_Message");

    // Constants
    const nameRegex = /^[A-Za-z\s]{3,60}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const phoneRegex = /^[6-9][0-9]{9}$/;
    const SUCCESS_MESSAGE_DURATION = 5000;

    // Error Handling Functions
    function showError(element, message) {
        element.textContent = message;
    }

    function clearError(element) {
        element.textContent = "";
    }

    // Input Restriction Functions
    function restrictNameInput(input) {
        input.value = input.value.replace(/[^A-Za-z\s]/g, "");
    }

    function restrictPhoneInput(input) {
        input.value = input.value.replace(/[^0-9]/g, "");
    }

    // Validation Functions
    function validateName() {
        const nameValue = name.value.trim();
        
        if (nameValue === "") {
            showError(errorName, "Full Name is required.");
            return false;
        }
        
        if (!nameRegex.test(nameValue)) {
            showError(errorName, "Only allowed (3-60 characters).");
            return false;
        }
        
        clearError(errorName);
        return true;
    }

    function validateEmail() {
        const emailValue = email.value.trim();
        
        if (emailValue === "") {
            showError(errorEmail, "Email is required.");
            return false;
        }
        
        if (!emailRegex.test(emailValue)) {
            showError(errorEmail, "Invalid email format.");
            return false;
        }
        
        clearError(errorEmail);
        return true;
    }

    function validatePhone() {
        const phoneValue = phone.value.trim();
        
        if (phoneValue === "") {
            showError(errorPhone, "Phone number is required.");
            return false;
        }
        
        if (!phoneRegex.test(phoneValue)) {
            showError(errorPhone, "Enter a valid 10-digit number starting with 6-9.");
            return false;
        }
        
        clearError(errorPhone);
        return true;
    }

    function validateMessage() {
        const messageValue = message.value.trim();
        
        if (messageValue.length < 10) {
            showError(errorMessage, "Message must be at least 10 characters.");
            return false;
        }
        
        clearError(errorMessage);
        return true;
    }

    // Success Message Functions
    function showSuccessMessage() {
        successMessage.classList.remove("hidden");
        successMessage.textContent = "Form submitted successfully!";
    }

    function hideSuccessMessage() {
        successMessage.classList.add("hidden");
    }

    // Form Reset Function
    function resetForm() {
        inquiryForm.reset();
        clearError(errorName);
        clearError(errorEmail);
        clearError(errorPhone);
        clearError(errorMessage);
    }

    // Form Submission Handler
    function handleFormSubmission(e) {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
            showSuccessMessage();
            resetForm();
            
            // Uncomment if you want to auto-hide success message
            // setTimeout(hideSuccessMessage, SUCCESS_MESSAGE_DURATION);
        }
    }

    // Event Listeners Setup
    function setupEventListeners() {
        name.addEventListener("input", function() {
            restrictNameInput(this);
            validateName();
        });

        phone.addEventListener("input", function() {
            restrictPhoneInput(this);
            validatePhone();
        });

        email.addEventListener("input", validateEmail);
        message.addEventListener("input", validateMessage);
        inquiryForm.addEventListener("submit", handleFormSubmission);
    }

    // Initialize the form
    setupEventListeners();
});
