window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("opacity-0", "pointer-events-none");
    setTimeout(() => loader.remove(), 600);
  }
});

let popup = document.getElementById("popup");
let popup_overlay = document.getElementById("popup-overlay");
let pop_form = document.getElementById("popupForm");
let successMessage = document.getElementById("success-message");
let formSubmitted = false;

let otpSent = false;
let otpField = document.getElementById("otp-field");
let otpButton = document.getElementById("otp-button");
let formFields = document.querySelectorAll(
  "#form-fields input, #form-fields select, #popupForm input[type='checkbox']"
);

function showPopup() {
  if (!formSubmitted) {
    popup.classList.remove("opacity-0", "pointer-events-none", "-mt-40");
    popup_overlay.classList.remove("opacity-0", "pointer-events-none");
  }
}

function hidePopup() {
  popup.classList.add("opacity-0", "pointer-events-none", "-mt-40");
  popup_overlay.classList.add("opacity-0", "pointer-events-none");

  if (!formSubmitted) {
    setTimeout(showPopup, 5000); // 5 sec delay for reshow
  }
}

setTimeout(showPopup, 5000);
popup_overlay.addEventListener("click", hidePopup);

pop_form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!otpSent) {
    // OTP Step: Show OTP field and disable rest of form
    otpSent = true;
    otpField.classList.remove("hidden");
    otpField.setAttribute("required", "true");
    otpButton.textContent = "Confirm OTP";

    formFields.forEach((field) => {
      if (field !== otpField) {
        field.disabled = true;
      }
    });
  } else {
    // OTP Confirmed: Show success message
    formSubmitted = true;
    popup.classList.add("opacity-0", "pointer-events-none");
    popup_overlay.classList.add("opacity-0", "pointer-events-none");
    successMessage.classList.remove("hidden");
    otpField.removeAttribute("required");

    setTimeout(() => {
      hidePopup();
      setTimeout(() => {
        formSubmitted = false;
        otpSent = false;
        pop_form.reset();
        otpField.classList.add("hidden");
        otpButton.textContent = "Send OTP";

        formFields.forEach((field) => {
          field.disabled = false;
        });

        popup.classList.add("opacity-0", "pointer-events-none", "-mt-40");
        popup_overlay.classList.add("opacity-0", "pointer-events-none");
        successMessage.classList.add("hidden");
      }, 1000);
    }, 5000);
  }
});

// whatsapp and call us now features

const whatsappBtn = document.getElementById("whatsappBtn");
const whatsappPopup = document.getElementById("whatsappPopup");
// const callBtn = document.getElementById("callBtn");
// const callPopup = document.getElementById("callPopup");

whatsappBtn.addEventListener("click", () => {
  whatsappPopup.classList.toggle("hidden");
  callPopup.classList.add("hidden");
});

// callBtn.addEventListener("click", () => {
//   callPopup.classList.toggle("hidden");
//   whatsappPopup.classList.add("hidden");
// });

// Close popups on outside click
document.addEventListener("click", function (e) {
  if (!whatsappBtn.contains(e.target) && !whatsappPopup.contains(e.target)) {
    whatsappPopup.classList.add("hidden");
  }
  // if (!callBtn.contains(e.target) && !callPopup.contains(e.target)) {
  //   callPopup.classList.add("hidden");
  // }
});

// menu slider functionality
const menuBtn = document.getElementById("menu-btn");
const menuIcon = document.getElementById("menu-icon");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("left-[-100%]");
  mobileMenu.classList.add("left-0");
  // Icon change to close
  //   menuIcon.classList.remove("ri-menu-line");
  //   menuIcon.classList.add("ri-close-line");
});

function close_menu() {
  mobileMenu.classList.remove("left-0");
  mobileMenu.classList.add("left-[-100%]");
  // Icon change back to menu
  //   menuIcon.classList.remove("ri-close-line");
  //   menuIcon.classList.add("ri-menu-line");
}
