// Franchise Enquiry Form with Full Validation

// window.addEventListener("load", function () {
//   const loader = document.getElementById("loader");
//   if (loader) loader.classList.add("opacity-0", "pointer-events-none");

//   const popup = document.getElementById("popup");
//   const popup_overlay = document.getElementById("popup-overlay");
//   const pop_form = document.getElementById("popupForm");
//   const successMessage = document.getElementById("success-message");
//   const otpField = document.getElementById("otp-field");
//   const otpContainer = document.getElementById("otp-container");
//   const otpButton = document.getElementById("otp-button");
//   const formFields = document.querySelectorAll(
//     "#form-fields input:not([type='checkbox']):not(#otp-field), #form-fields select"
//   );
//   const terms = document.getElementById("terms");
//   const otpError = document.getElementById("otp-not-send-error");
//   const otp_succsess_massage = document.getElementById("otp_succsess_massage");

//   let otpSent = false;
//   let formSubmitted = false;
//   const validOTP = "123456";

//   function showPopup() {
//     if (!formSubmitted) {
//       popup.classList.remove("hidden");
//       popup.classList.remove("hide_pop_up_form");
//       popup.classList.add("show_pop_up_form");

//       popup_overlay.classList.remove("hidden");
//       popup_overlay.classList.remove("hide_pop_up_form_overlay");
//       popup_overlay.classList.add("show_pop_up_form_overlay");
//     }
//   }

//   function hidePopup() {
//     popup.classList.remove("show_pop_up_form");
//     popup.classList.add("hide_pop_up_form");
//     setTimeout(() => {
//       popup.classList.add("hidden");
//     }, 1000);

//     popup_overlay.classList.remove("show_pop_up_form_overlay");
//     popup_overlay.classList.add("hide_pop_up_form_overlay");
//     setTimeout(() => {
//       popup_overlay.classList.add("hidden");
//     }, 1000);

//     if (!formSubmitted) setTimeout(showPopup, 5000);
//   }

//   popup_overlay.addEventListener("click", hidePopup);
//   setTimeout(showPopup, 3000);

//   function showError(input, message = "") {
//     let errorEl;
//     if (input.type === "checkbox") {
//       errorEl =
//         input.parentElement.parentElement.querySelector(".error-message");
//       if (!errorEl) {
//         errorEl = document.createElement("p");
//         errorEl.className = "error-message text-red-500 text-xs mt-1";
//         input.parentElement.parentElement.appendChild(errorEl);
//       }
//       input.classList.add("outline", "outline-1", "outline-red-500");
//     } else {
//       errorEl = input.parentElement.querySelector(".error-message");
//       if (!errorEl) {
//         errorEl = document.createElement("p");
//         errorEl.className = "error-message text-red-500 text-xs mt-1";
//         input.parentElement.appendChild(errorEl);
//       }
//       input.classList.add("border-red-500", "ring-2", "ring-red-300");
//     }

//     if (message) {
//       errorEl.textContent = message;
//       errorEl.classList.remove("hidden");
//     } else {
//       errorEl.textContent = "";
//       errorEl.classList.add("hidden");
//     }
//   }

//   function clearError(input) {
//     let errorEl =
//       input.type === "checkbox"
//         ? input.parentElement.parentElement.querySelector(".error-message")
//         : input.parentElement.querySelector(".error-message");

//     if (errorEl) {
//       errorEl.textContent = "";
//       errorEl.classList.add("hidden");
//     }
//     input.classList.remove(
//       "border-red-500",
//       "ring-2",
//       "ring-red-300",
//       "outline",
//       "outline-1",
//       "outline-red-500"
//     );
//   }

//   function validateInputs() {
//     let isValid = true;

//     formFields.forEach((field) => {
//       clearError(field);
//       const value = field.value.trim();

//       if (value === "") {
//         showError(field, "This field is required");
//         isValid = false;
//         return;
//       }

//       if (field.placeholder === "Full Name") {
//         const namePattern = /^[A-Za-z\s]{3,60}$/;
//         if (!namePattern.test(value)) {
//           showError(field, "Enter 3–60 alphabetic characters only");
//           isValid = false;
//         }
//       } else if (field.placeholder === "WhatsApp Number") {
//         const phonePattern = /^[6-9]\d{9}$/;
//         if (!phonePattern.test(value)) {
//           showError(field, "Enter a valid 10-digit number starting with 6-9");
//           isValid = false;
//         }
//       } else if (field.type === "email") {
//         if (value.length < 3 || value.length > 60) {
//           showError(field, "Email must be between 3 and 60 characters");
//           isValid = false;
//         } else {
//           const emailPattern =
//             /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//           if (!emailPattern.test(value)) {
//             showError(field, "Enter a valid email");
//             isValid = false;
//           }
//         }
//       } else if (field.tagName === "SELECT" && field.selectedIndex === 0) {
//         showError(field, "Select a valid option");
//         isValid = false;
//       }
//     });

//     clearError(terms);
//     if (!terms.checked) {
//       showError(terms, "You must agree to terms & conditions");
//       isValid = false;
//     }

//     return isValid;
//   }

//   function fakeSendOtpApi() {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(true);
//       }, 1000);
//     });
//   }

//   pop_form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     if (!otpSent) {
//       if (validateInputs()) {
//         fakeSendOtpApi().then((success) => {
//           if (success) {
//             otpSent = true;
//             otpContainer.classList.remove("hidden");
//             otp_succsess_massage.textContent = "OTP sent successfully";
//             otp_succsess_massage.classList.remove("hidden");
//             otpField.focus();
//             otpButton.textContent = "Submit";

//             formFields.forEach((field) => {
//               clearError(field);
//               field.disabled = true;
//             });

//             terms.disabled = true;
//             clearError(terms);
//             clearError(otpField);
//             otpError.textContent = "";
//             otpError.classList.add("hidden");
//           } else {
//             otpSent = false;
//             otpContainer.classList.add("hidden");
//             otpError.textContent =
//               "Failed to send OTP. Please try again later.";
//             otpError.classList.remove("hidden");
//           }
//         });
//       }
//     } else {
//       const enteredOTP = otpField.value.trim();
//       clearError(otpField);
//       otpError.textContent = "";
//       otpError.classList.add("hidden");

//       const otpRegex = /^\d{6}$/;
//       if (!otpRegex.test(enteredOTP)) {
//         showError(otpField, "OTP must be a 6-digit number");
//         return;
//       }

//       if (enteredOTP !== validOTP) {
//         showError(otpField, "Invalid OTP");
//         return;
//       }

//       formSubmitted = true;
//       // popup.classList.remove("show_pop_up_form");
//       // popup.classList.add("hide_pop_up_form");

//       // setTimeout(() => {
//       //   popup.classList.add("hidden");
//       // }, 1000);

//       // popup_overlay.classList.remove("show_pop_up_form_overlay");
//       // popup_overlay.classList.add("hide_pop_up_form_overlay");
//       // setTimeout(() => {
//       //   popup_overlay.classList.add("hidden");
//       // }, 1000);

//       popup.classList.add("hidden");
//       popup_overlay.classList.add("hidden");
//       successMessage.classList.remove("hidden");

//       setTimeout(() => {
//         successMessage.classList.add("hidden");
//         pop_form.reset();
//         otpSent = false;
//         formSubmitted = false;
//         otpField.value = "";
//         otpContainer.classList.add("hidden");
//         otpButton.textContent = "Send OTP";
//         otpError.textContent = "";
//         otpError.classList.add("hidden");

//         formFields.forEach((field) => (field.disabled = false));
//         terms.disabled = false;
//       }, 3000);
//     }
//   });

//   setTimeout(() => loader?.remove(), 600);

//   document.getElementById("fullname").addEventListener("input", function () {
//     this.value = this.value.replace(/[^A-Za-z\s]/g, "");
//   });

//   document.getElementById("phone").addEventListener("input", function () {
//     this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
//   });

//   document.getElementById("otp-field").addEventListener("input", function () {
//     this.value = this.value.replace(/[^0-9]/g, "").slice(0, 6);
//   });
// });



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
  const validOTP = "123456"; // demo otp

  function showPopup() {
    if (!formSubmitted) {
      popup.classList.remove("hidden", "hide_pop_up_form");
      popup.classList.add("show_pop_up_form");

      popup_overlay.classList.remove(
        "hidden",
        "hide_pop_up_form_overlay"
      );
      popup_overlay.classList.add("show_pop_up_form_overlay");
    }
  }

  function hidePopup() {
    popup.classList.remove("show_pop_up_form");
    popup.classList.add("hide_pop_up_form");
    setTimeout(() => {
      popup.classList.add("hidden");
    }, 1000);

    popup_overlay.classList.remove("show_pop_up_form_overlay");
    popup_overlay.classList.add("hide_pop_up_form_overlay");
    setTimeout(() => {
      popup_overlay.classList.add("hidden");
    }, 1000);

    if (!formSubmitted) setTimeout(showPopup, 5000);
  }

  popup_overlay.addEventListener("click", hidePopup);
  setTimeout(showPopup, 3000);

  function showError(input, message = "") {
    let errorEl;
    if (input.type === "checkbox") {
      errorEl =
        input.parentElement.parentElement.querySelector(".error-message");
      if (!errorEl) {
        errorEl = document.createElement("p");
        errorEl.className = "error-message text-red-500 text-xs mt-1";
        input.parentElement.parentElement.appendChild(errorEl);
      }
      input.classList.add("outline", "outline-1", "outline-red-500");
    } else {
      errorEl = input.parentElement.querySelector(".error-message");
      if (!errorEl) {
        errorEl = document.createElement("p");
        errorEl.className = "error-message text-red-500 text-xs mt-1";
        input.parentElement.appendChild(errorEl);
      }
      input.classList.add("border-red-500", "ring-2", "ring-red-300");
    }

    if (message) {
      errorEl.textContent = message;
      errorEl.classList.remove("hidden");
    } else {
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
    }
  }

  function clearError(input) {
    let errorEl =
      input.type === "checkbox"
        ? input.parentElement.parentElement.querySelector(".error-message")
        : input.parentElement.querySelector(".error-message");

    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
    }
    input.classList.remove(
      "border-red-500",
      "ring-2",
      "ring-red-300",
      "outline",
      "outline-1",
      "outline-red-500"
    );
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
        const phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(value)) {
          showError(field, "Enter a valid 10-digit number starting with 6-9");
          isValid = false;
        }
      } else if (field.type === "email") {
        if (value.length < 3 || value.length > 60) {
          showError(field, "Email must be between 3 and 60 characters");
          isValid = false;
        } else {
          const emailPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailPattern.test(value)) {
            showError(field, "Enter a valid email");
            isValid = false;
          }
        }
      } else if (field.tagName === "SELECT" && field.selectedIndex === 0) {
        showError(field, "Select a valid option");
        isValid = false;
      }
    });

    clearError(terms);
    if (!terms.checked) {
      showError(terms, "You must agree to terms & conditions");
      isValid = false;
    }

    return isValid;
  }

  
  function sendOtpToWhatsApp(phoneNumber) {
    return fetch(
      `https://sastakirana.com/action/otp-verification.php?mobile=${phoneNumber}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("OTP API response:", data);
        
        if (data.success || data.status === "success") {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        return false;
      });
  }

  pop_form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!otpSent) {
      if (validateInputs()) {
        const phoneInput = document.getElementById("phone").value.trim();

        sendOtpToWhatsApp(phoneInput).then((success) => {
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

      const otpRegex = /^\d{6}$/;
      if (!otpRegex.test(enteredOTP)) {
        showError(otpField, "OTP must be a 6-digit number");
        return;
      }

     
      if (enteredOTP !== validOTP) {
        showError(otpField, "Invalid OTP");
        return;
      }

      formSubmitted = true;

      popup.classList.add("hidden");
      popup_overlay.classList.add("hidden");
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

  document.getElementById("fullname").addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z\s]/g, "");
  });

  document.getElementById("phone").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
  });

  document.getElementById("otp-field").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "").slice(0, 6);
  });
});



