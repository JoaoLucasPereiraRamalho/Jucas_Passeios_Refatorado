"use strict";

const url = "http://localhost:5000/api";
const renderApiResult = document.getElementById("renderApiResult");

// ===============================
// 🔄 Buscar todas as viagens
// ===============================
async function getViagens() {
  if (!renderApiResult) return;

  renderApiResult.innerHTML = `
    <div class="text-center">
      <div class="spinner-border text-primary" role="status"></div>
      <p>Carregando viagens...</p>
    </div>
  `;

  try {
    const response = await axios.get(url);
    const data = response.data;

    renderViagens(data);
  } catch (error) {
    renderApiResult.innerHTML = `
      <div class="alert alert-danger">
        Erro ao carregar viagens.
      </div>
    `;
    console.error(error);
  }
}

// ===============================
// 🎨 Renderizar viagens em cards
// ===============================
function renderViagens(viagens) {
  if (!viagens || viagens.length === 0) {
    renderApiResult.innerHTML = `
      <div class="alert alert-warning">
        Nenhuma viagem encontrada.
      </div>
    `;
    return;
  }

  renderApiResult.innerHTML = "";

  viagens.forEach((viagem) => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="card shadow-sm h-100">
        <img src="${viagem.image}" class="card-img-top" alt="Imagem da viagem">
        <div class="card-body">
          <h5 class="card-title">${viagem.title}</h5>
          <p class="card-text">${viagem.description}</p>
          <p><strong>Preço:</strong> R$ ${viagem.price}</p>
          <p><strong>Veículo:</strong> ${viagem.vehicle}</p>
        </div>
      </div>
    `;

    renderApiResult.appendChild(card);
  });
}

// ===============================
// ➕ Adicionar nova viagem
// ===============================
async function addNewViagem(newViagem) {
  try {
    const response = await axios.post(url, newViagem);

    alert("Viagem cadastrada com sucesso!");
    getViagens();
  } catch (error) {
    alert("Erro ao cadastrar viagem.");
    console.error(error);
  }
}

// ===============================
// 📩 Formulário (se existir)
// ===============================
const viagemForm = document.getElementById("viagemForm");

if (viagemForm) {
  viagemForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const viagemData = {};

    formData.forEach((value, key) => {
      viagemData[key] = value;
    });

    addNewViagem(viagemData);
  });
}

// ===============================
// 🚀 Inicialização
// ===============================
getViagens();
