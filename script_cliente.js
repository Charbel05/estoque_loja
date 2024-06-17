const axios = require('axios').default;

axios.get('http://localhost:3000')
.then(function (response) {
    console.log(response.data);
})
.catch(function (error){
    console.log(error);
})

document.getElementById('mybutton').addEventListener('click', function() {
    axios.get('http://localhost:3000/compare?v1=John')
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error){
        console.log(error);
    });
});