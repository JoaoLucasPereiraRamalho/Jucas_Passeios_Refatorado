"use strict";
const url = "http://localhost:5500/api"

function getUsers() {
    axios.get(url)
      .then(response => {
        const data = response.data
  
        renderApiResult.textContent = JSON.stringify(data)
      })
      .catch(error => console.log(error))
  }

  getUsers()

function deleteUser(id) {
    axios.delete(`${url}/${id}`)
      .then(response => {
        alert(JSON.stringify(response.data))
        getUsers()
      })
      .catch(error => console.error(error));
  }

  document.getElementById('formDelete').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userId = formData.get('id'); // Obter o valor do campo 'id'

    deleteUser(userId);
});