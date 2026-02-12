"use strict";

const url = "http://localhost:5000/api";

const btnBuscar = document.getElementById("btnBuscar");
const btnDeletar = document.getElementById("btnDeletar");
const dadosViagem = document.getElementById("dadosViagem");
const mensagem = document.getElementById("mensagem");

let viagemAtual = null;

// 🔎 Buscar viagem antes de deletar
btnBuscar.addEventListener("click", () => {
  const id = document.getElementById("idBusca").value;

  if (!id) {
    mostrarMensagem("Informe um ID válido.", "danger");
    return;
  }

  axios
    .get(`${url}/${id}`)
    .then((response) => {
      viagemAtual = response.data;

      dadosViagem.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5>${viagemAtual.title}</h5>
            <p>${viagemAtual.description}</p>
            <p><strong>Preço:</strong> R$ ${viagemAtual.price}</p>
            <p><strong>Veículo:</strong> ${viagemAtual.vehicle}</p>
          </div>
        </div>
      `;

      btnDeletar.disabled = false;
      mostrarMensagem("Viagem encontrada. Confirme para deletar.", "warning");
    })
    .catch(() => {
      viagemAtual = null;
      dadosViagem.innerHTML = "";
      btnDeletar.disabled = true;
      mostrarMensagem("Viagem não encontrada.", "danger");
    });
});

// 🗑️ Deletar viagem
btnDeletar.addEventListener("click", () => {
  if (!viagemAtual) return;

  const confirmar = confirm("Tem certeza que deseja deletar esta viagem?");

  if (!confirmar) return;

  axios
    .delete(`${url}/${viagemAtual.id}`)
    .then(() => {
      mostrarMensagem("Viagem deletada com sucesso!", "success");
      dadosViagem.innerHTML = "";
      btnDeletar.disabled = true;
      document.getElementById("idBusca").value = "";
      viagemAtual = null;
    })
    .catch(() => {
      mostrarMensagem("Erro ao deletar viagem.", "danger");
    });
});

// 📢 Mensagens bonitas
function mostrarMensagem(texto, tipo) {
  mensagem.innerHTML = `
    <div class="alert alert-${tipo}" role="alert">
      ${texto}
    </div>
  `;
}
