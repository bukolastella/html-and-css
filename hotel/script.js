"use strict";

const slide = document.querySelectorAll(".slide");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
const dots = document.querySelector(".dots");
const tabs = document.querySelectorAll(".btn");
const tabContainer = document.getElementsByClassName("buttons")[0];
// const tabContainer = document.querySelector(".buttons");room
const tabContent = document.querySelectorAll(".operations__content");
const room = document.querySelector(".room");
const section1 = document.querySelector(".talk");
const nav = document.querySelector(".nav");
const wrapper = document.querySelector(".wrapper");
//slider
const goToSlide = function (slides) {
  slide.forEach(
    (s, i) => (s.style.transform = `translateX( ${100 * (i - slides)}%)`)
  );
};
const nextSlide = function () {
  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;
  // curslide = 1{first slide}  we want -100% 0% 200% etc.
  goToSlide(curSlide);
  activeDots(curSlide);
  time = 0;
};
const prevSlide = function () {
  if (curSlide === 0) curSlide = maxSlide - 1;
  else curSlide--;
  goToSlide(curSlide);
  activeDots(curSlide);
  time = 0;
};
const activeDots = function (slide) {
  document
    .querySelectorAll(".dot")
    .forEach((d) => d.classList.remove("dot-active"));
  document
    .querySelector(`.dot[data-slide="${slide}"]`)
    .classList.add("dot-active");
};
//
let curSlide = 0;
const maxSlide = slide.length;
//
slide.forEach((s, i) =>
  dots.insertAdjacentHTML(
    "beforeend",
    `<button class="dot" data-slide="${i}"></button>`
  )
);
goToSlide(0);
activeDots(0);
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  e.key === "ArrowLeft" && prevSlide();
  time = 0;
});

//events delegation
dots.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activeDots(slide);
    time = 0;
  }
});
//auto slider
let time = 0;
setInterval(() => {
  time++;
  if (time === 5) nextSlide(curSlide);
}, 1000);
//tab component
tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".btn");
  // console.log(clicked);

  if (!clicked) return;
  tabs.forEach((t) => t.classList.remove("active"));
  e.target.classList.add("active");

  tabContent.forEach((t) => t.classList.remove("content-active"));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("content-active");
});

//reveal Section rooms
const revealSection = function (entries, observer) {
  // console.log(observer);
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

room.classList.add("section-hidden");
sectionObserver.observe(room);

//jumping card
let card = document.getElementsByClassName("card")[0];
card.style.transform = "translate(-50%, -80%)";
setInterval(() => {
  // card = document.getElementsByClassName("card")[0];
  if (card.style.transform == "translate(-50%, -80%)")
    card.style.transform = "translate(-50%, -50%)";
}, 1000);
setInterval(() => {
  // card = document.getElementsByClassName("card")[0];
  if (card.style.transform == "translate(-50%, -50%)")
    card.style.transform = "translate(-50%, -80%)";
}, 3000);

card.addEventListener("mouseover", function () {
  card = document.getElementsByClassName("card")[0];
  card.style.transform = "translate(-50%, -50%)";
  // card = 0;
});

//sticky nav
const call = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const os = new IntersectionObserver(call, {
  root: null,
  threshold: 0,
  rootMargin: "-90px",
});

os.observe(wrapper);
