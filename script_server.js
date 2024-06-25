const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs'); // Necessário para manipular arquivos
const app = express();
const port = 3000;
const users = require('./user.json');
let loja = require('./produtos.json'); // Carrega o arquivo produtos.json

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

app.post('/adicionar', (req, res) => {
    const { tipo, produto, quantidade } = req.body;

    // Procura o produto e atualiza a quantidade
    const category = loja[tipo];
    if (category) {
        const item = category.find(item => item.nome === produto);
        if (item) {
            item.quantidade += parseInt(quantidade, 10); // Atualiza a quantidade
            fs.writeFileSync('./produtos.json', JSON.stringify(loja, null, 2)); // Salva no arquivo
            res.send('Produto atualizado com sucesso.');
        } else {
            res.status(404).send('Produto não encontrado.');
        }
    } else {
        res.status(404).send('Categoria não encontrada.');
    }
});

app.post('/remover', (req, res) => {
    const { tipo, produto, quantidade } = req.body;

    // Procura o produto e atualiza a quantidade
    const category = loja[tipo];
    if (category) {
        const item = category.find(item => item.nome === produto);
        if (item) {
            if (item.quantidade >= parseInt(quantidade, 10)) {
                item.quantidade -= parseInt(quantidade, 10); // Atualiza a quantidade
                fs.writeFileSync('./produtos.json', JSON.stringify(loja, null, 2)); // Salva no arquivo
                res.send('Produto removido com sucesso.');
            } else {
                res.status(400).send('Quantidade insuficiente em estoque.');
            }
        } else {
            res.status(404).send('Produto não encontrado.');
        }
    } else {
        res.status(404).send('Categoria não encontrada.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
