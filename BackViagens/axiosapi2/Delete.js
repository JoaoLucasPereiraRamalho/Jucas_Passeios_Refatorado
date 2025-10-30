"use strict";
const url = "http://localhost:5000/api";

function getViagens() {
  axios.get(url)
    .then(response => {
      const data = response.data;

      renderApiResult.textContent = JSON.stringify(data);
    })
    .catch(error => console.log(error));
}

getViagens();

function deleteViagem(id) {
  axios.delete(`${url}/${id}`)
    .then(response => {
      alert(JSON.stringify(response.data));
      getViagens();
    })
    .catch(error => console.error(error));
}

document.getElementById('formDelete').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const viagemId = formData.get('id'); // Obter o valor do campo 'id'

  deleteViagem(viagemId);
});
