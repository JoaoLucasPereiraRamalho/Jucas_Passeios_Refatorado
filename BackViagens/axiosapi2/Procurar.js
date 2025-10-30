"use strict";
const url = "http://localhost:5000/api";

function getViagem(id) {
  axios.get(`${url}/${id}`)
    .then(response => {
      const data = response.data;

      viagemId.textContent = data.id;
      viagemTitle.textContent = data.title;
      viagemDescription.textContent = data.description;
      viagemPrice.textContent = data.price;
      viagemVehicle.textContent = data.vehicle;
      viagemImage.src = data.image;
    })
    .catch(error => console.log(error));
}

document.getElementById('formProcurar').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const viagemId = formData.get('id'); // Obter o valor do campo 'id'

  getViagem(viagemId);
});

getViagens();
