"use strict";
const url = "http://localhost:5500/api"


function updateUser(user, id) {
    axios.put(`${url}/${id}`, user)
      .then(response => {
        alert(JSON.stringify(response.data))
        getUsers()
      })
      .catch(error => console.error(error));
  }

  document.getElementById('formAtualiza').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const userData = {};
  
    formData.forEach((value, name) => {
      userData[name] = value;
    });
  
    // Certifique-se de que o formulário tenha um campo 'id' para identificar o usuário
    const userId = userData.id;
  
    if (userId) {
      // Chame a função de atualização do usuário
      updateUser(userData, userId);
    } else {
      alert("Por favor, forneça um ID válido para atualizar o usuário.");
    }
  });