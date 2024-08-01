function adicionarTransacao(button) {
    const clienteId = button.getAttribute('data-cliente-id');

    const formData = new FormData(document.getElementById('fantasia-form'));

    fetch(`/controle/clientes/historico/${clienteId}/`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar a fantasia do cliente');
        }
        return response.json();
    })
    .then(data => {
        console.log('Fantasia do cliente adicionada com sucesso:', data);
        location.reload();
    })
    .catch(error => {
        console.error('Erro ao adicionar a fantasia do cliente:', error.message);
    });
}

async function recuperarNomeFantasia(fantasiaId) {
    try {
        const response = await fetch(`/controle/fantasias/${fantasiaId}/`);
        const dados = await response.json();
        const nomeFantasia = dados.nome_fantasia;
        return nomeFantasia; // Retorna o valor para ser usado posteriormente
    } catch (error) {
        console.error('Erro ao recuperar nome da fantasia:', error);
    }
}

function inserirPrecoBase(){
    const fantasiaId = document.getElementById('fantasia').value
    fetch(`/controle/fantasias/${fantasiaId}/`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao recuperar dados da fantasia');
        }
        return response.json();
    })
    .then(dados => {

        const precoContainer = document.getElementById('preco_fantasia')

        const tipoTransacao = document.getElementById('tipo_transacao').value

        if(tipoTransacao == "C"){
            precoContainer.value = dados.preco_venda;
        }
        else{
            precoContainer.value = dados.preco_aluguel;
        }
    })
}

function toggleDataFim() {
    const tipoFantasia = document.getElementById('tipo_transacao').value;
    const dataFimContainer = document.getElementById('data_fim_fantasia_div');
    
    if (tipoFantasia === 'C') {
        dataFimContainer.style.display = 'none';
    } else {
        dataFimContainer.style.display = 'block';
    }
}

function toggleBaixa(button){
    const idTransacao = button.getAttribute('transacao-id');
    // alert(idTransacao);
    fetch(`/controle/clientes/fantasias/baixa/${idTransacao}/`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao dar baixa na fantasia do cliente');
        }
        location.reload();
    })
}

// Dropdown List com Search
$(document).ready(function() {
    $('.select2').select2({
        placeholder: "Selecione a fantasia...",
        allowClear: true
    });
});