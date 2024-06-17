const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const users = require('./user.json');

app.use(express.static(path.join(__dirname)));

// Middleware para analisar o corpo das solicitações POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body; 

    // Verifica se o usuário existe no "banco de dados" simulado
    const user = users.people.find(user => user.username === username && user.password === password);

    if (user) {
        res.sendFile(path.join(__dirname, 'home.html'));
    } else {
        res.send('<script>alert("Usuário ou senha inválidos"); window.location.href = "/";</script>');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})