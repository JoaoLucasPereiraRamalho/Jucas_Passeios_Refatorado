"use strict";

const url = "http://localhost:5000/api";

const btnBuscar = document.getElementById("btnBuscar");
const form = document.getElementById("formAtualiza");
const mensagem = document.getElementById("mensagem");

// 🔎 Buscar viagem pelo ID
btnBuscar.addEventListener("click", () => {
  const id = document.getElementById("idBusca").value;

  if (!id) {
    mostrarMensagem("Informe um ID válido.", "danger");
    return;
  }

  axios
    .get(`${url}/${id}`)
    .then((response) => {
      const data = response.data;

      document.getElementById("id").value = data.id;
      document.getElementById("title").value = data.title;
      document.getElementById("description").value = data.description;
      document.getElementById("price").value = data.price;
      document.getElementById("vehicle").value = data.vehicle;
      document.getElementById("image").value = data.image;

      mostrarMensagem("Viagem carregada com sucesso!", "success");
    })
    .catch(() => {
      mostrarMensagem("Viagem não encontrada.", "danger");
    });
});

// 🔄 Atualizar viagem
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const id = document.getElementById("id").value;

  if (!id) {
    mostrarMensagem("Busque uma viagem antes de atualizar.", "warning");
    return;
  }

  const viagemAtualizada = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    vehicle: document.getElementById("vehicle").value,
    image: document.getElementById("image").value,
  };

  axios
    .put(`${url}/${id}`, viagemAtualizada)
    .then(() => {
      mostrarMensagem("Viagem atualizada com sucesso!", "success");
      form.reset();
    })
    .catch(() => {
      mostrarMensagem("Erro ao atualizar viagem.", "danger");
    });
});

// 📢 Função para exibir mensagens bonitas
function mostrarMensagem(texto, tipo) {
  mensagem.innerHTML = `
    <div class="alert alert-${tipo}" role="alert">
      ${texto}
    </div>
  `;
}
