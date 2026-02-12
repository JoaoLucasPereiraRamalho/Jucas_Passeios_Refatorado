"use strict";

const url = "http://localhost:5000/api";

const form = document.getElementById("formProcurar");
const resultado = document.getElementById("resultado");

// ===============================
// 🔍 Buscar viagem por ID
// ===============================
async function getViagem(id) {
  resultado.innerHTML = `
    <div class="text-center">
      <div class="spinner-border text-warning" role="status"></div>
      <p>Buscando viagem...</p>
    </div>
  `;

  try {
    const response = await axios.get(`${url}/${id}`);
    const viagem = response.data;

    renderResultado(viagem);
  } catch (error) {
    resultado.innerHTML = `
      <div class="alert alert-danger text-center">
        Viagem não encontrada.
      </div>
    `;

    console.error(error);
  }
}

// ===============================
// 🎨 Renderizar resultado
// ===============================
function renderResultado(viagem) {
  resultado.innerHTML = `
    <div class="card shadow">
      <img src="${viagem.image}" class="card-img-top" alt="Imagem da viagem">
      <div class="card-body">
        <h5 class="card-title">${viagem.title}</h5>
        <p class="card-text">${viagem.description}</p>
        <p><strong>Preço:</strong> R$ ${viagem.price}</p>
        <p><strong>Veículo:</strong> ${viagem.vehicle}</p>
        <p><strong>ID:</strong> ${viagem.id}</p>
      </div>
    </div>
  `;
}

// ===============================
// 📩 Evento do formulário
// ===============================
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("id").value;

    if (!id) {
      resultado.innerHTML = `
        <div class="alert alert-warning text-center">
          Informe um ID válido.
        </div>
      `;
      return;
    }

    getViagem(id);
  });
}
