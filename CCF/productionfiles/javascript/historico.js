function excluirClienteFantasia(event) {
    // Previne o comportamento padrão do botão
    event.preventDefault();

    // Obtém o ID do cliente a partir do atributo data-cliente-id
    const fantasiaClienteId = event.target.getAttribute('data-fantasia-cliente-id');

    // Confirmação de exclusão
    const confirmacao = confirm("Tem certeza que deseja excluir esta transação?");
    if (!confirmacao) {
        return;
    }

    // Faz uma requisição para o servidor para excluir o cliente
    fetch(`/controle/historico/deletar/${fantasiaClienteId}/`)
    .then(response => {
        if (response.ok) {
            console.log("oi")
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

function toggleDataFim() {
    const tipoFantasia = document.getElementById('tipo_transacao').value;
    const dataFimContainer = document.getElementById('data_fim_fantasia_div');
    
    if (tipoFantasia === 'C') {
        dataFimContainer.style.display = 'none';
    } else {
        dataFimContainer.style.display = 'block';
    }
}

let currentFantasiaClienteId = null;

document.addEventListener("DOMContentLoaded", function() {

const editarButtons = document.querySelectorAll('[data-modal-target="editar-modal"]');

editarButtons.forEach(button => {
    button.addEventListener("click", function() {
        const fantasiaClienteId = this.getAttribute('data-fantasia-cliente-id');

        console.log(fantasiaClienteId)
        
        currentFantasiaClienteId = fantasiaClienteId

        fetch(`/controle/historico/${fantasiaClienteId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter os dados do cliente fantasia');
                }
                return response.json();
            })
            .then(
                data => {
                document.getElementById('nomeCF').value = data.nome;
                document.getElementById('fantasia').value = data.nome_fantasia;
                document.getElementById('preco_fantasia').value = data.preco_fantasia;
                document.getElementById('tipo_transacao').value = data.tipo_transacao;
                document.getElementById('data_inicio_fantasia').value = data.data_inicio_fantasia;
                document.getElementById('data_fim_fantasia').value = data.data_fim_fantasia;
                toggleDataFim();
            })
            .catch(error => {
                console.error('Erro ao obter os dados do cliente:', error.message);
            });
        });
    });
});


function editarTransacao() {

    const fantasiaClienteId = currentFantasiaClienteId

    const formData = new FormData(document.getElementById('editar-form'));
    
    fetch(`/controle/historico/editar/${fantasiaClienteId}/`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao editar o cliente fantasia');
        }
        window.location.href = '/controle/historico/';
    })
    .catch(error => {
        console.error('Erro ao editar o cliente fantasia:', error.message);
    });
}

document.getElementById('table-search').addEventListener('input', function() {
    var searchText = this.value.toLowerCase();
    
    // Pego o corpo da tabela
    var rows = document.querySelectorAll('tbody tr');

    // Pego apenas os nomes das fantasias
    var nomesDosClientes = document.querySelectorAll('tbody tr th');

    // Para cada linha do corpo:
    for(var i=0; i < rows.length; i++) {

        // pego apenas o nome do cliente
        var nomeCliente = nomesDosClientes[i].textContent.toLowerCase();

        // Se incluir o texto eu deixo a linha a mostra
        if (nomeCliente.includes(searchText)) {
            rows[i].style.display = '';
        } else { // Senão, eu oculto a linha
            rows[i].style.display = 'none';
        }
    }
});