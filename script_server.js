const express = require('express')
const users = require('./user.json');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    //a = parseInt(req.params.v1)
    //b = parseInt(req.params.v2)
    //c = a+b
    //res.send("Soma: " + c)
})

app.get('/compare', (req, res) => {
    const v1 = req.query.v1;
    //const v2 = parseInt(req.query.v2);

    const matchingUsers = users.filter(user => user.name === v1);

    if (matchingUsers.length > 0) {
        res.send(matchingUsers);
    }
        
});

app.listen(port, () => {
    console.log(`HTTP rodando em port = http://localhost:${port}`)
})