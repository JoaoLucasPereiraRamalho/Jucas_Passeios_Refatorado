// Slider automático simples
const slides = document.querySelector(".slides");
let index = 0;

setInterval(() => {
  index = (index + 1) % 3;
  slides.style.transform = `translateX(-${index * 100}%)`;
}, 5000);
