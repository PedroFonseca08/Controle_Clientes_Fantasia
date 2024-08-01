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
        return nomeFantasia; 
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


// Dropdown List com Search
$(document).ready(function() {
    $('.select2').select2({
        placeholder: "Selecione a fantasia...",
        allowClear: true
    });
});

//Excluir Transação
function excluirTransacao(event) {
    event.preventDefault();

    const fantasiaClienteId = event.target.getAttribute('data-fantasia-cliente-id');

    const confirmacao = confirm("Tem certeza que deseja excluir esta transação?");
    if (!confirmacao) {
        return;
    }

    fetch(`/controle/historico/deletar/${fantasiaClienteId}/`)
    .then(response => {
        if (response.ok) {
            event.target.closest('tr').remove();
        } else {
            return response.json().then(data => {
                throw new Error(data.message || "Erro ao excluir a transação.");
            });
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Erro ao excluir a transação: " + error.message);
    });
}



document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][data-id]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const transacaoId = this.getAttribute('data-id');
            editarTransacao(transacaoId, this.checked);
        });
    });
});

function editarTransacao(transacaoId, isChecked) {
    console.log('editarTransacao chamada com id:', transacaoId, 'checked:', isChecked);

    const baixa_fantasia = isChecked ? 'S' : 'N';
    const formBody = `baixa_fantasia=${encodeURIComponent(baixa_fantasia)}`;

    fetch(`/controle/historico/editar/${transacaoId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCookie('csrftoken') // Certifique-se de obter o token CSRF corretamente
        },
        body: formBody
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar a transação');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log('Transação atualizada com sucesso:', data.message);
        } else {
            console.error('Erro ao atualizar a transação:', data.error);
        }
    })
    .catch(error => {
        console.error('Erro ao atualizar a transação:', error.message);
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    console.log('CSRF Token:', cookieValue); // Adicione este log
    return cookieValue;
}
