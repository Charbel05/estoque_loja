const axios = require('axios').default;

axios.get('http://localhost:3000')

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne a submissão padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Dados a serem enviados para o servidor
    const data = {
        username: username,
        password: password
    };

    // Envia a requisição POST para o servidor
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            window.location.href = 'home.html'; // Redireciona para a página "home.html"
        } else {
            document.getElementById('error-message').textContent = 'Invalid username or password';
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('error-message').textContent = 'Failed to authenticate. Please try again later.';
    });
});
