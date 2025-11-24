let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function () {
  nextImage();
}, 2000);

function nextImage() {
  count++;
  if (count > 4) {
    count = 1;
  }

  document.getElementById("radio" + count).checked = true;
}

document.querySelector(".menu-toggle").addEventListener("click", function () {
  // Esta função adiciona ou remove a classe 'menu-open' na tag <header>.
  // O CSS que definimos usa essa classe para mostrar ou esconder o menu mobile.
  document.querySelector(".header").classList.toggle("menu-open");
});
