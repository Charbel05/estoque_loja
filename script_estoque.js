document.addEventListener('DOMContentLoaded', function() {
    var tipoSelect = document.getElementById("tipo");
    var produtoSelect = document.getElementById("produto");

    tipoSelect.addEventListener("change", function() {
        produtoSelect.innerHTML = ""; // Clear previous options

        var options;
        if (tipoSelect.value === "eletronico") {
            options = ["Celular", "Notebook", "Tablet"];
        } else if (tipoSelect.value === "vestuario") {
            options = ["Camiseta", "Calça", "Vestido"];
        } else if (tipoSelect.value === "alimento") {
            options = ["Arroz", "Feijão", "Macarrão"];
        }

        options.forEach(function(option) {
            var optionElement = document.createElement("option");
            optionElement.value = option.toLowerCase(); // Normaliza para minúsculas
            optionElement.text = option;
            produtoSelect.appendChild(optionElement);
        });
    });

    document.querySelector('.btn-adicionar').addEventListener('click', function(event) {
        event.preventDefault();
        const tipo = document.getElementById('tipo').value;
        const produto = document.getElementById('produto').value;
        const quantidade = document.getElementById('quantidade').value;

        const data = {
            tipo: tipo,
            produto: produto,
            quantidade: quantidade
        };

        fetch('/adicionar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.text())
          .then(data => alert(data))
          .catch(error => console.error('Error:', error));
    });

    document.querySelector('.btn-retirar').addEventListener('click', function(event) {
        event.preventDefault();
        const tipo = document.getElementById('tipo').value;
        const produto = document.getElementById('produto').value;
        const quantidade = document.getElementById('quantidade').value;

        const data = {
            tipo: tipo,
            produto: produto,
            quantidade: quantidade
        };

        fetch('/remover', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.text())
          .then(data => alert(data))
          .catch(error => console.error('Error:', error));
    });
});
