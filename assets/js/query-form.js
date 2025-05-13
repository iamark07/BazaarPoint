window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("opacity-0", "pointer-events-none");

  const popup = document.getElementById("popup");
  const popup_overlay = document.getElementById("popup-overlay");
  const pop_form = document.getElementById("popupForm");
  const successMessage = document.getElementById("success-message");
  const otpField = document.getElementById("otp-field");
  const otpContainer = document.getElementById("otp-container");
  const otpButton = document.getElementById("otp-button");
  const formFields = document.querySelectorAll(
    "#form-fields input:not([type='checkbox']):not(#otp-field), #form-fields select"
  );

  const terms = document.getElementById("terms");

  let otpSent = false;
  let formSubmitted = false;
  const validOTP = "123456";

  // Show popup
  function showPopup() {
    if (!formSubmitted) {
      popup.classList.remove("opacity-0", "pointer-events-none", "-mt-40");
      popup_overlay.classList.remove("opacity-0", "pointer-events-none");
    }
  }

  // Hide popup
  function hidePopup() {
    popup.classList.add("opacity-0", "pointer-events-none", "-mt-40");
    popup_overlay.classList.add("opacity-0", "pointer-events-none");
    if (!formSubmitted) setTimeout(showPopup, 5000);
  }

  popup_overlay.addEventListener("click", hidePopup);
  setTimeout(showPopup, 3000);

  // Utility: Show error
  function showError(input, message = "") {
    let errorEl = input.parentElement.querySelector(".error-message");
    if (!errorEl) {
      errorEl = document.createElement("p");
      errorEl.className = "error-message text-red-500 text-xs mt-1";
      input.parentElement.appendChild(errorEl);
    }

    if (message) {
      errorEl.textContent = message;
      errorEl.classList.remove("hidden");
    } else {
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
    }

    input.classList.add("border-red-500", "ring-2", "ring-red-300");
  }

  // Utility: Clear error
  function clearError(input) {
    let errorEl = input.parentElement.querySelector(".error-message");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
    }
    input.classList.remove("border-red-500", "ring-2", "ring-red-300");
  }

  // Validate form
  function validateInputs() {
    let isValid = true;

    formFields.forEach((field) => {
      clearError(field);
      const value = field.value.trim();

      //   console.log("Field:", field.name || field.id, "| Value:", value);

      if (value === "") {
        showError(field, "This field is required");
        isValid = false;
        // console.log("⚠️ Empty field:", field.name || field.id);
        return;
      }

      if (field.type === "email") {
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailPattern.test(value)) {
          showError(field, "Enter a valid email");
          isValid = false;
        }
      } else if (field.placeholder === "WhatsApp Number") {
        const phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(value)) {
          showError(field, "Enter a valid 10-digit number");
          isValid = false;
        }
      } else if (field.tagName === "SELECT" && field.selectedIndex === 0) {
        showError(field, "Please select an option");
        isValid = false;
      }
    });

    // Validate terms checkbox
    clearError(terms);
    if (!terms.checked) {
      terms.classList.add("border-red-500", "ring-2", "ring-red-300");
      isValid = false;
    } else {
      terms.classList.remove("border-red-500", "ring-2", "ring-red-300");
    }
    return isValid;
  }

  // On form submit
  pop_form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!otpSent) {
      if (validateInputs()) {
        otpSent = true;
        otpContainer.classList.remove("hidden");
        otpField.focus();
        otpButton.textContent = "Submit";

        formFields.forEach(clearError);
        clearError(terms);
        clearError(otpField);
      }
    } else {
      const enteredOTP = otpField.value.trim();
      clearError(otpField);

      if (enteredOTP === "") {
        showError(otpField, "Please enter OTP");
        return;
      }

      if (enteredOTP !== validOTP) {
        showError(otpField, "Invalid OTP");
        return;
      }

      formSubmitted = true;

      popup.classList.add("opacity-0", "pointer-events-none");
      popup_overlay.classList.add("opacity-0", "pointer-events-none");
      successMessage.classList.remove("hidden");

      setTimeout(() => {
        successMessage.classList.add("hidden");
        pop_form.reset();
        otpSent = false;
        formSubmitted = false;
        otpField.value = "";
        otpContainer.classList.add("hidden");
        otpButton.textContent = "Send OTP";
      }, 5000);
    }
  });

  setTimeout(() => loader?.remove(), 600);
});
