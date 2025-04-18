window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    loader.classList.add("opacity-0", "pointer-events-none", "transition-opacity", "duration-500");
    setTimeout(() => loader.remove(), 600); // Optional: remove from DOM
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