let rifasVendidas = [];

// Função para carregar as rifas vendidas do armazenamento local
function carregarRifasSalvas() {
    const rifasSalvas = localStorage.getItem('rifasVendidas');
    if (rifasSalvas) {
        rifasVendidas = JSON.parse(rifasSalvas);
        atualizarListaRifas();
        atualizarProgresso();
    }
}

// Função para salvar as rifas vendidas no armazenamento local
function salvarRifas() {
    localStorage.setItem('rifasVendidas', JSON.stringify(rifasVendidas));
}

// Chamar a função de carregar as rifas vendidas ao carregar a página
carregarRifasSalvas();

function atualizarListaRifas() {
    const rifaList = document.getElementById('rifa-list');
    rifaList.innerHTML = '';
    rifasVendidas.forEach(rifa => {
        const li = document.createElement('li');
        li.textContent = `${rifa.nome} - Rifa ${rifa.numero}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Apagar';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function() {
            apagarRifa(rifa.numero);
        });
        li.appendChild(deleteButton);
        rifaList.appendChild(li);
    });
}

function atualizarProgresso() {
    const porcentagem = (rifasVendidas.length / 2000) * 100;
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = porcentagem + '%';
    const progressLabel = document.getElementById('progress-label');
    progressLabel.textContent = porcentagem.toFixed(2) + '%';
}

function venderRifa() {
    const nome = prompt('Digite o nome do comprador:');
    if (!nome) return; // Se o nome estiver vazio ou cancelado, saia da função

    const numeroRifaInput = document.getElementById('numero-rifa');
    const numeroRifa = parseInt(numeroRifaInput.value);
    if (numeroRifa >= 1 && numeroRifa <= 2000 && !rifasVendidas.some(rifa => rifa.numero === numeroRifa)) {
        rifasVendidas.push({ nome, numero: numeroRifa });
        salvarRifas(); // Salvar as rifas vendidas após cada venda
        atualizarListaRifas();
        atualizarProgresso();
        numeroRifaInput.value = '';
    } else {
        alert('O número da rifa deve ser entre 1 e 2000 e não pode ser repetido.');
    }
}

function apagarRifa(numeroRifa) {
    rifasVendidas = rifasVendidas.filter(rifa => rifa.numero !== numeroRifa);
    salvarRifas(); // Salvar as rifas vendidas após apagar uma rifa
    atualizarListaRifas();
    atualizarProgresso();
}
