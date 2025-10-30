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

function getViagem() {
  axios.get(`${url}/1`)
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


function addNewViagem(newViagem) {

  axios.post(url, newViagem)
    .then(response => {
      alert(JSON.stringify(response.data));
      getViagens();
    })
    .catch(error => console.error(error));
}


document.getElementById('viagemForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const viagemData = {};

  formData.forEach((value, title) => {
    viagemData[title] = value;
  });
  addNewViagem(viagemData);
});
