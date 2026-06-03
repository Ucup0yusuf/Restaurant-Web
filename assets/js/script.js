"use strict ";

// prealoader

const preload = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preload.classList.add("loaded");
});

// add event on multiple element
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

// navbar

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

// active nav-links when click
const navLinks = document.querySelectorAll("[data-nav-link]");

// active nav-link on history change
window.addEventListener("popstate", function () {
  const currentHash = window.location.hash;

  navLinks.forEach((n) => {
    n.classList.remove("active");

    // check if the nav-link has the same hash as the current URL
    if (n.getAttribute("href") === currentHash) {
      n.classList.add("active");
    }
  });
});

const navLinkAction = function () {
  // toggle acvtive class on each nav-link
  navLinks.forEach((n) => n.classList.remove("active"));
  this.classList.add("active");
};

addEventOnElements(navLinks, "click", navLinkAction);

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

// HEADER & BACK TOP BTN

const header = document.querySelector("[data-header]");
// const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;

  if (isScrollBottom) {
    header.classList.add("hide");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("hide");
    backTopBtn.classList.remove("active");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");

    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }

  lastScrollPos = window.scrollY;
});

// Hero SLider

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[ data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[ data-next-btn]");

let currentSlidePos = 0;
let lastActiveSlideItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSlideItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSlideItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);

// auto slide

let autoSlideInterval;

const startAutoSlide = function () {
  autoSlideInterval = setInterval(slideNext, 7000);
};

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseover",
  function () {
    clearInterval(autoSlideInterval);
  },
);

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseout",
  startAutoSlide,
);

window.addEventListener("load", startAutoSlide);

// Parallax effect

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {
  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerHeight) * 10 - 5;

  // reverse the number

  x = x - x * 2;
  y = y - y * 2;

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
});
