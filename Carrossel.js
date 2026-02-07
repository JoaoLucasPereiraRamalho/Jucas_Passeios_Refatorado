document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const btnPrev = document.querySelector(".carousel-btn.prev");
  const btnNext = document.querySelector(".carousel-btn.next");

  if (!track || slides.length === 0) {
    console.warn("Carrossel não inicializado: elementos não encontrados.");
    return;
  }

  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;
  let autoplayInterval;

  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Botões
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      stopAutoplay();
      nextSlide();
      startAutoplay();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      stopAutoplay();
      prevSlide();
      startAutoplay();
    });
  }

  // Touch (mobile)
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoplay();
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const diff = startX - e.touches[0].clientX;
    if (diff > 50) {
      nextSlide();
      isDragging = false;
    } else if (diff < -50) {
      prevSlide();
      isDragging = false;
    }
  });

  track.addEventListener("touchend", () => {
    isDragging = false;
    startAutoplay();
  });

  // Resize
  window.addEventListener("resize", updateCarousel);

  // Inicialização
  updateCarousel();
  startAutoplay();
});
