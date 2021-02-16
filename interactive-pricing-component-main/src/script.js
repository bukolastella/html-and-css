"use strict";
const ideas = document.querySelector(".idea");
const slider = document.querySelector(".slider");
const mo = document.querySelector(".mo");
const view = document.querySelector(".view");
const span = document.querySelector(".span");
ideas.addEventListener("click", function () {
  if (ideas.classList.contains("off")) {
    ideas.style.background = "rgba(110, 231, 183)";
    ideas.style.justifyContent = "flex-end";
    ideas.classList.toggle("off");
    wer(0.75);
  } else {
    ideas.style.background = "rgba(209, 213, 219)";
    ideas.style.justifyContent = "";
    ideas.classList.toggle("off");
    wer(1);
  }
});

const wer = function (text) {
  if (slider.value == 1) {
    view.innerHTML = `10K <span class="ml-1 tracking-widest">Pageviews</span>`;
    span.textContent = 8 * text;
  }
  if (slider.value == 2) {
    view.innerHTML = `50K <span class="ml-1 tracking-widest">Pageviews</span>`;
    span.textContent = 12 * text;
  }
  if (slider.value == 3) {
    view.innerHTML = `100K <span class="ml-1 tracking-widest">Pageviews</span>`;
    span.textContent = 16 * text;
  }
  if (slider.value == 4) {
    view.innerHTML = `500K <span class="ml-1 tracking-widest">Pageviews</span>`;
    span.innerHTML = 24 * text;
  }
  if (slider.value == 5) {
    view.innerHTML = `1M <span class="ml-1 tracking-widest">Pageviews</span>`;
    span.innerHTML = 36 * text;
  }
};

const rte = function () {
  if (slider.value == 1) {
    view.innerHTML = `10K <span class="ml-1 tracking-widest">Pageviews</span>`;
    span.textContent = 8;
    if (!ideas.classList.contains("off")) {
      wer(0.75);
    }
  }
  if (slider.value == 2) {
    view.innerHTML = `50K <span class="ml-1 tracking-widest">Pageviews</span>`;
    span.textContent = 12;
    if (!ideas.classList.contains("off")) {
      wer(0.75);
    }
  }
  if (slider.value == 3) {
    view.innerHTML = `100K <span class="ml-1 tracking-widest">Pageviews</span>`;
    span.textContent = 16;
    if (!ideas.classList.contains("off")) {
      wer(0.75);
    }
  }
  if (slider.value == 4) {
    view.innerHTML = `500K <span class="ml-1 tracking-widest">Pageviews</span>`;
    span.innerHTML = 24;
    if (!ideas.classList.contains("off")) {
      wer(0.75);
    }
  }
  if (slider.value == 5) {
    view.innerHTML = `1M <span class="ml-1 tracking-widest">Pageviews</span>`;
    span.innerHTML = 36;
    if (!ideas.classList.contains("off")) {
      wer(0.75);
    }
  }
};
slider.addEventListener("click", rte);
