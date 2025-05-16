// // franchise enquiry form validation

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
  const otpError = document.getElementById("otp-not-send-error");
  const otp_succsess_massage = document.getElementById("otp_succsess_massage");

  let otpSent = false;
  let formSubmitted = false;
  const validOTP = "123456";

  function showPopup() {
    if (!formSubmitted) {
      popup.classList.remove("opacity-0", "pointer-events-none", "-mt-40");
      popup_overlay.classList.remove("opacity-0", "pointer-events-none");
    }
  }

  function hidePopup() {
    popup.classList.add("opacity-0", "pointer-events-none", "-mt-40");
    popup_overlay.classList.add("opacity-0", "pointer-events-none");
    if (!formSubmitted) setTimeout(showPopup, 5000);
  }

  popup_overlay.addEventListener("click", hidePopup);
  setTimeout(showPopup, 3000);

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

  function clearError(input) {
    let errorEl = input.parentElement.querySelector(".error-message");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
    }
    input.classList.remove("border-red-500", "ring-2", "ring-red-300");
  }

  function validateInputs() {
    let isValid = true;

    formFields.forEach((field) => {
      clearError(field);
      const value = field.value.trim();

      if (value === "") {
        showError(field, "This field is required");
        isValid = false;
        return;
      }

      if (field.placeholder === "Full Name") {
        const namePattern = /^[A-Za-z\s]{3,60}$/;
        if (!namePattern.test(value)) {
          showError(field, "Enter 3–60 alphabetic characters only");
          isValid = false;
        }
      } else if (field.placeholder === "WhatsApp Number") {
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(value)) {
          showError(field, "Enter a valid 10-digit number");
          isValid = false;
        }
      } else if (field.type === "email") {
        if (value.length < 3 || value.length > 60) {
          showError(field, "Email must be between 3 and 60 characters");
          isValid = false;
        } else {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            showError(field, "Enter a valid email");
            isValid = false;
          }
        }
      } else if (field.tagName === "SELECT" && field.selectedIndex === 0) {
        showError(field, "Please select an option");
        isValid = false;
      }
    });

    clearError(terms);
    if (!terms.checked) {
      terms.classList.add("border-red-500", "ring-2", "ring-red-300");
      isValid = false;
    } else {
      terms.classList.remove("border-red-500", "ring-2", "ring-red-300");
    }

    return isValid;
  }

  // fake send otp api
  function fakeSendOtpApi() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.2;
        resolve(success);
      }, 1000);
    });
  }

  pop_form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!otpSent) {
      if (validateInputs()) {
        fakeSendOtpApi().then((success) => {
          if (success) {
            otpSent = true;
            otpContainer.classList.remove("hidden");
            otp_succsess_massage.textContent = "OTP sent successfully";
            otp_succsess_massage.classList.remove("hidden");
            otpField.focus();
            otpButton.textContent = "Submit";

            formFields.forEach((field) => {
              clearError(field);
              field.disabled = true;
            });

            terms.disabled = true;
            clearError(terms);
            clearError(otpField);
            otpError.textContent = "";
            otpError.classList.add("hidden");
          } else {
            otpSent = false;
            otpContainer.classList.add("hidden");
            otpError.textContent =
              "Failed to send OTP. Please try again later.";
            otpError.classList.remove("hidden");
          }
        });
      }
    } else {
      const enteredOTP = otpField.value.trim();
      clearError(otpField);
      otpError.textContent = "";
      otpError.classList.add("hidden");

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
        otpError.textContent = "";
        otpError.classList.add("hidden");

        formFields.forEach((field) => (field.disabled = false));
        terms.disabled = false;
      }, 3000);
    }
  });

  setTimeout(() => loader?.remove(), 600);

  // ✅ Prevent numbers in Full Name input
  document.getElementById("fullname").addEventListener("input", function (e) {
    this.value = this.value.replace(/[^A-Za-z\s]/g, "");
  });

  // ✅ Prevent letters in WhatsApp Number input
  document.getElementById("phone").addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9]/g, "");
  });
});
