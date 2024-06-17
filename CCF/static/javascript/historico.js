function toggleDataFim() {
    const tipoFantasia = document.getElementById('tipo_fantasia').value;
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
                document.getElementById('tipo_fantasia').value = data.tipo_fantasia;
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
