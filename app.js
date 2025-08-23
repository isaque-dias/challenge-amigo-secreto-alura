let listaDeAmigos = JSON.parse(localStorage.getItem('amigos')) || [];

const input = document.getElementById('amigo');
const listaElement = document.getElementById('listaAmigos');
const resultadoContainer = document.getElementById('resultadoContainer');

atualizarLista();

// Adicionar amigo
function adicionarAmigo() {
    const nome = input.value.trim();

    if (!nome) {
        alert('Por favor, digite um nome válido.');
        return;
    }

    if (listaDeAmigos.includes(nome)) {
        alert('Esse nome já foi adicionado.');
        input.value = '';
        return;
    }

    listaDeAmigos.push(nome);
    salvarLista();
    atualizarLista();
    input.value = '';
    input.focus();
}

// Atualizar lista na tela
function atualizarLista() {
    listaElement.innerHTML = '';
    listaDeAmigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${amigo} `;
        
        // Botão para remover
        const removerBtn = document.createElement('button');
        removerBtn.textContent = '🗑️';
        removerBtn.setAttribute('aria-label', `Remover ${amigo}`);
        removerBtn.onclick = () => {
            listaDeAmigos.splice(index, 1);
            salvarLista();
            atualizarLista();
        };

        li.appendChild(removerBtn);
        listaElement.appendChild(li);
    });
}

// Salvar lista no localStorage
function salvarLista() {
    localStorage.setItem('amigos', JSON.stringify(listaDeAmigos));
}

// Sortear amigos
function sortearTodos() {
    if (listaDeAmigos.length < 2) {
        alert('É necessário pelo menos 2 amigos para sortear.');
        return;
    }

    let amigosDisponiveis = [...listaDeAmigos];
    const sorteio = {};

    listaDeAmigos.forEach(amigo => {
        let possiveis = amigosDisponiveis.filter(a => a !== amigo);
        const escolhido = possiveis[Math.floor(Math.random() * possiveis.length)];
        sorteio[amigo] = escolhido;
        amigosDisponiveis = amigosDisponiveis.filter(a => a !== escolhido);
    });

    mostrarResultado(sorteio);
}

// Exibir resultado
function mostrarResultado(sorteio) {
    resultadoContainer.innerHTML = '<h3>Resultado do Amigo Secreto:</h3>';
    const ul = document.createElement('ul');

    for (const [amigo, escolhido] of Object.entries(sorteio)) {
        const li = document.createElement('li');
        li.textContent = `${amigo} tirou ${escolhido}`;
        ul.appendChild(li);
    }

    resultadoContainer.appendChild(ul);
}
