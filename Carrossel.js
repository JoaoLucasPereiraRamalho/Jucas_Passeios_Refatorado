document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const btnPrev = document.querySelector(".carousel-btn.prev");
  const btnNext = document.querySelector(".carousel-btn.next");

  if (!carousel || !track || slides.length === 0) {
    console.warn("Carrossel não encontrado no HTML.");
    return;
  }

  let currentIndex = 0;
  let slideWidth = slides[0].clientWidth;
  let autoplay;
  let startX = 0;
  let isDragging = false;

  // Atualiza posição
  function updateCarousel() {
    slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Próximo slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  // Slide anterior
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  // Autoplay
  function startAutoplay() {
    autoplay = setInterval(nextSlide, 4000);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
  }

  // Eventos botões
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

  // Swipe mobile
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoplay();
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    const moveX = e.touches[0].clientX;
    const diff = startX - moveX;

    if (diff > 50) {
      nextSlide();
      isDragging = false;
    }

    if (diff < -50) {
      prevSlide();
      isDragging = false;
    }
  });

  track.addEventListener("touchend", () => {
    isDragging = false;
    startAutoplay();
  });

  // Responsivo
  window.addEventListener("resize", updateCarousel);

  // Pausar quando mouse estiver sobre
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  // Inicialização
  updateCarousel();
  startAutoplay();
});
