let listaDeAmigos = [];

function adicionarAmigo() {
    input = document.getElementById('amigo');
    nome = input.value.trim();

    if (nome === '') {
        alert('Por favor, digite um nome válido.');
        return;
    }

    if (listaDeAmigos.includes(nome)) {
        alert('Esse nome já foi adicionado.');
        input.value = '';
        return;
    }

    listaDeAmigos.push(nome);
    atualizarLista();
    input.value = '';
    input.focus();
}


function atualizarLista() {
    ul = document.getElementById('listaAmigos');
    ul.innerHTML = '';

    listaDeAmigos.forEach((amigo, index) => {
        li = document.createElement('li');
        li.textContent = `${index + 1}. ${amigo}`;
        ul.appendChild(li);
    });
}

function sortearAmigo() {
    resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    if (listaDeAmigos.length === 0) {
        alert('Adicione pelo menos um nome antes de sortear.');
        return;
    }

    indiceSorteado = Math.floor(Math.random() * listaDeAmigos.length);
    amigoSorteado = listaDeAmigos[indiceSorteado];

    li = document.createElement('li');
    li.textContent = `O amigo secreto sorteado é: ${amigoSorteado}!`;
    resultado.appendChild(li);
}
