"use strict";
const url = "http://localhost:5000/api";

function updateViagem(viagem, id) {
  axios.put(`${url}/${id}`, viagem)
    .then(response => {
      alert(JSON.stringify(response.data));
      getViagens();
    })
    .catch(error => console.error(error));
}

document.getElementById('formAtualiza').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const viagemData = {};

  formData.forEach((value, title) => {
    viagemData[title] = value;
  });

  // Certifique-se de que o formulário tenha um campo 'id' para identificar a viagem
  const viagemId = viagemData.id;

  if (viagemId) {
    // Chame a função de atualização da viagem
    updateViagem(viagemData, viagemId);
  } else {
    alert("Por favor, forneça um ID válido para atualizar a viagem.");
  }
});
