"use strict";
const url = "http://localhost:5500/api"



function getUser(id) {
    axios.get(`${url}/${id}`)
      .then(response => {
        const data = response.data
  
        userAvatar.src = data.avatar
        userNome.textContent = data.name
        userId.textContent = data.id
        userCity.textContent = data.city
        userPassword.textContent=data.password
        userEmail.textContent=data.email
      })
      .catch(error => console.log(error))
  }
  
  document.getElementById('formProcurar').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userId = formData.get('id'); // Obter o valor do campo 'id'

    getUser(userId);
});

