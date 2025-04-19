// image caraousel fade change transition feature

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const contentWrapper = document.getElementById("carousel-content");
const heading = document.getElementById("carousel-heading");
const desc = document.getElementById("carousel-desc");
const btnText = document.getElementById("carousel-btn-text");
const btnLink = document.getElementById("carousel-btn-link");

const content = [
    {
      title: "Start Your Franchise Journey <br> with Mega Mart 99",
      desc: "Join a network of thriving franchise owners with low investment and high return opportunities.",
      btn: "Explore Franchise Models",
      link: "#franchise-models",
    },
    {
      title: "Empower Your Entrepreneurial Dreams",
      desc: "Unlock the potential of your city with a trusted brand and full business support.",
      btn: "Become a Partner",
      link: "contact.html",
    },
    {
      title: "Your Future in Franchising <br> Begins Here",
      desc: "Connect with thousands of customers through our powerful franchise platform.",
      btn: "Start Now",
      link: "contact.html",
    },
  ];
  

let current = 0;
let isTransitioning = false;

function showSlide(index) {
  if (isTransitioning) return;
  isTransitioning = true;

  // Switch slide images
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? "1" : "0";
    slide.style.zIndex = i === index ? "10" : "0";
    dots[i].classList.toggle("bg-white", i === index);
    dots[i].classList.toggle("bg-white/30", i !== index);
  });

  // Fade out content
  contentWrapper.classList.remove("opacity-100");
  contentWrapper.classList.add("opacity-0");

  // After fade out, change content and fade back in
  setTimeout(() => {
    heading.innerHTML = content[index].title;
    desc.innerHTML = content[index].desc;
    btnText.innerHTML = content[index].btn;
    btnLink.setAttribute("href", content[index].link);

    contentWrapper.classList.remove("opacity-0");
    contentWrapper.classList.add("opacity-100");

    isTransitioning = false;
  }, 400); // Match with transition duration
  current = index;
}

document.getElementById("prevBtn").addEventListener("click", () => {
  const newIndex = (current - 1 + slides.length) % slides.length;
  showSlide(newIndex);
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const newIndex = (current + 1) % slides.length;
  showSlide(newIndex);
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => showSlide(i));
});

setInterval(() => {
  const newIndex = (current + 1) % slides.length;
  showSlide(newIndex);
}, 6000);

showSlide(0);

// support and training popup feature

function openModal(id) {
  document.getElementById("modal" + id).classList.remove("hidden");
}

function closeModal(id) {
  document.getElementById("modal" + id).classList.add("hidden");
}

// faq section slide feature

document.querySelectorAll(".faq-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector("svg");

    content.classList.toggle("hidden");
    icon.classList.toggle("rotate-180");
  });
});
