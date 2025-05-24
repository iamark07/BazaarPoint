

const openPopupButtons = document.querySelectorAll(".open-popup-btn");
const popup = document.getElementById("popup");
const popup_overlay = document.getElementById("popup-overlay");

// Loop through and attach click listener
openPopupButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
      popup.classList.remove("opacity-0", "pointer-events-none", "-mt-40");
      popup_overlay.classList.remove("opacity-0", "pointer-events-none");
  });
});


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
