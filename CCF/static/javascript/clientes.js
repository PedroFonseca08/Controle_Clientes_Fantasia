document.getElementById('table-search').addEventListener('input', function() {
    var searchText = this.value.toLowerCase();
    
    var rows = document.querySelectorAll('tbody tr');

    rows.forEach(function(row) {
        var nomeCliente = row.querySelector('th').textContent.toLowerCase();

        if (nomeCliente.includes(searchText)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

let currentClientId = null;

document.addEventListener("DOMContentLoaded", function() {

const editarButtons = document.querySelectorAll('[data-modal-target="editar-modal"]');

editarButtons.forEach(button => {
    button.addEventListener("click", function() {
        const clienteId = button.dataset.clienteId;
        currentClientId = clienteId
        fetch(`/controle/clientes/${clienteId}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter os dados do cliente');
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('nome_edit').value = data.nome;
                document.getElementById('cpf_edit').value = data.cpf;
                document.getElementById('telefone_edit').value = data.telefone;
                document.getElementById('rg_edit').value = data.rg;
                document.getElementById('cep_edit').value = data.cep;
                document.getElementById('endereco_edit').value = data.endereco;
                document.getElementById('data_nasc_edit').value = data.data_nasc;
                document.getElementById('observacao_edit').value = data.observacao;
            })
            .catch(error => {
                console.error('Erro ao obter os dados do cliente:', error.message);
            });
        });
    });
});


function editarCliente() {

    const clienteId = currentClientId
    const formData = new FormData(document.getElementById('editar-form'));
    
    formData.append('cliente_id', clienteId);

    fetch(`/controle/clientes/editar/${clienteId}/`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao editar o cliente');
        }
        window.location.href = '/controle/clientes/';
    })
    .catch(error => {
        console.error('Erro ao editar o cliente:', error.message);
    });
}

