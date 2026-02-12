"use strict";

const url = "http://localhost:5000/api";
const lista = document.getElementById("listaViagens");

// 🔄 Carregar viagens
function carregarViagens() {
  axios
    .get(url)
    .then((response) => {
      lista.innerHTML = "";

      response.data.forEach((viagem) => {
        lista.innerHTML += `
          <div class="col-md-4 mb-4">
            <div class="card shadow-sm">
              <img src="${viagem.image}" class="card-img-top" style="height:220px; object-fit:cover;">
              <div class="card-body">
                <h5>${viagem.title}</h5>
                <p class="text-muted">${viagem.description}</p>
                <p class="price">R$ ${viagem.price}</p>
                <div class="d-flex justify-content-between mt-3">
                  <button class="btn btn-warning btn-sm" onclick="abrirEditar(${viagem.id})">
                    ✏ Editar
                  </button>
                  <button class="btn btn-danger btn-sm" onclick="deletar(${viagem.id})">
                    🗑 Deletar
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch(() => {
      lista.innerHTML = "<p class='text-center'>Erro ao carregar viagens.</p>";
    });
}

carregarViagens();

// ➕ Criar
document.getElementById("formCriar").addEventListener("submit", function (e) {
  e.preventDefault();

  const novaViagem = {
    title: createTitle.value,
    description: createDescription.value,
    price: createPrice.value,
    vehicle: createVehicle.value,
    image: createImage.value,
  };

  axios.post(url, novaViagem).then(() => {
    carregarViagens();
    this.reset();
    bootstrap.Modal.getInstance(document.getElementById("modalCriar")).hide();
  });
});

// ✏ Abrir modal editar
window.abrirEditar = function (id) {
  axios.get(`${url}/${id}`).then((response) => {
    const v = response.data;

    editId.value = v.id;
    editTitle.value = v.title;
    editDescription.value = v.description;
    editPrice.value = v.price;
    editVehicle.value = v.vehicle;
    editImage.value = v.image;

    new bootstrap.Modal(document.getElementById("modalEditar")).show();
  });
};

// 🔄 Atualizar
document.getElementById("formEditar").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = editId.value;

  const viagemAtualizada = {
    title: editTitle.value,
    description: editDescription.value,
    price: editPrice.value,
    vehicle: editVehicle.value,
    image: editImage.value,
  };

  axios.put(`${url}/${id}`, viagemAtualizada).then(() => {
    carregarViagens();
    bootstrap.Modal.getInstance(document.getElementById("modalEditar")).hide();
  });
});

// 🗑 Deletar
window.deletar = function (id) {
  if (!confirm("Tem certeza que deseja deletar esta viagem?")) return;

  axios.delete(`${url}/${id}`).then(() => {
    carregarViagens();
  });
};
