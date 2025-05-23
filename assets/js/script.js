// hero section slider feature
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
];

let isMobile = window.innerWidth < 640;
let slides = document.querySelectorAll(
  isMobile ? ".slide-mobile" : ".slide-desktop"
);
const dots = document.querySelectorAll(".dot");
const contentWrapper = document.getElementById("carousel-content");
const heading = document.getElementById("carousel-heading");
const desc = document.getElementById("carousel-desc");
const btnText = document.getElementById("carousel-btn-text");
const btnLink = document.getElementById("carousel-btn-link");

let current = 0;
let isTransitioning = false;

function showSlide(index) {
  if (isTransitioning) return;
  isTransitioning = true;

  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? "1" : "0";
    slide.style.zIndex = i === index ? "10" : "0";
    if (dots[i]) {
      dots[i].classList.toggle("bg-white", i === index);
      dots[i].classList.toggle("bg-white/30", i !== index);
    }
  });

  // Fade out content
  contentWrapper.classList.add("opacity-0");

  setTimeout(() => {
    // Ensure content becomes visible if hidden
    contentWrapper.classList.remove("hidden");

    heading.innerHTML = content[index].title;
    desc.innerHTML = content[index].desc;
    btnText.innerHTML = content[index].btn;
    btnLink.setAttribute("href", content[index].link);

    // Fade in new content
    contentWrapper.classList.remove("opacity-0");
    contentWrapper.classList.add("opacity-100");
    isTransitioning = false;
  }, 400);

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

// Auto slide every 6 seconds
setInterval(() => {
  const newIndex = (current + 1) % slides.length;
  showSlide(newIndex);
}, 6000);

// Handle window resize
let previousIsMobile = isMobile;
window.addEventListener("resize", () => {
  const nowIsMobile = window.innerWidth < 640;
  if (nowIsMobile !== previousIsMobile) {
    previousIsMobile = nowIsMobile;
    isMobile = nowIsMobile;
    slides = document.querySelectorAll(
      isMobile ? ".slide-mobile" : ".slide-desktop"
    );
    current = 0;
    showSlide(current);
  }
});

// Initial show
showSlide(0);

// counter section count features

let started = false;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        started = true;
        document.querySelectorAll(".counter").forEach((counter) => {
          const target = +counter.getAttribute("data-target");
          let count = 0;
          const increment = target / 200;

          const updateCounter = () => {
            if (count < target) {
              count += increment;
              counter.innerText = Math.ceil(count);
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target.toLocaleString();
            }
          };
          updateCounter();
        });
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(document.querySelector("#stats"));

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
    const isOpen = content.classList.contains("max-h-[1000px]");

    // Close all
    document.querySelectorAll(".faq-content").forEach((c) => {
      c.style.maxHeight = null;
      c.classList.remove("opacity-100", "max-h-[1000px]");
      c.classList.add("opacity-0");
    });
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("shadow-lg");
      item.querySelector("svg").classList.remove("rotate-180");
    });

    if (!isOpen) {
      content.classList.remove("opacity-0");
      content.classList.add("opacity-100", "max-h-[1000px]");
      content.style.maxHeight = content.scrollHeight + "px";
      btn.closest(".faq-item").classList.add("shadow-lg");
      icon.classList.add("rotate-180");
    }
  });
});
