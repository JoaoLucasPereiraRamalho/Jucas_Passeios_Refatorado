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

function getUser() {
  axios.get(`${url}/1`)
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



function addNewUser(newUser) {

  axios.post(url, newUser)
    .then(response => {
      alert(JSON.stringify(response.data))
      getUsers()
    })
    .catch(error => console.error(error));
}


document.getElementById('userForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
    const userData = {};

    formData.forEach((value, name) => {
      userData[name] = value;
  });
  addNewUser(userData);
});