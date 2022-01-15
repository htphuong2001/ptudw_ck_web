let navbar = document.querySelector(".navbar");

document.querySelector("#btn-menu").onclick = () => {
  navbar.classList.toggle("active");
};

// Slider
let slides = document.querySelectorAll(".slide-img");
let btnSlides = document.querySelectorAll(".slide-nav .box");
let currentSlide = 0;

const repeat = () => {
  return setInterval(() => {
    currentSlide++;
    if (currentSlide == btnSlides.length) currentSlide = 0;

    manualNav(currentSlide);
  }, 5000);
};

const manualNav = (manual) => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  btnSlides.forEach((btnSlide) => {
    btnSlide.classList.remove("active");
  });

  slides[manual].classList.add("active");
  btnSlides[manual].classList.add("active");
};

slides[currentSlide].classList.add("active");
btnSlides[currentSlide].classList.add("active");
let repeater = repeat();

btnSlides.forEach((btnSlide, index) => {
  btnSlide.addEventListener("click", () => {
    console.log(index);
    manualNav(index);
    currentSlide = index;
    clearInterval(repeater);
    repeater = repeat();
  });
});
