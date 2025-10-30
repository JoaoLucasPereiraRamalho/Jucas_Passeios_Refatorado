"use strict";
const url = "http://localhost:5500/api"

function loginUser(email, password) {
    // Faz uma requisição GET para obter todos os usuários
    axios.get(url)
        .then(response => {
            const responseData = response.data;

            if (responseData.users && Array.isArray(responseData.users)) {
                // Se a resposta tem a propriedade 'users' e é um array
                const foundUser = responseData.users.find(user => user.email === email && user.password === password);

                if (foundUser) {
                    // Usuário encontrado, faça algo aqui (por exemplo, redirecione para outra página)
                    alert("Login bem-sucedido!");
                    window.location.href = "Menu.html";
                } else {
                    // Usuário não encontrado, informe ao usuário
                    alert("Nome de usuário ou senha incorretos");
                }
            } else {
                console.error("A resposta da API não contém um array de usuários:", responseData);
            }
        })
        .catch(error => console.error(error));
}


document.getElementById('formLogin').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const userData = {};
  
    formData.forEach((value, email) => {
        userData[email] = value;
    });
    loginUser(userData.email, userData.password); // Passar o nome e a senha como argumentos
});