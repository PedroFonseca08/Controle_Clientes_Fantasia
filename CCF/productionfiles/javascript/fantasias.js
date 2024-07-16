document.getElementById('costume-search').addEventListener('input', function() {
    var searchText = this.value.toLowerCase();

    // Pego o corpo da tabela
    var rows = document.querySelectorAll('tbody tr');

    // Pego apenas os nomes das fantasias
    var nomesDeFantasias = document.querySelectorAll('tbody tr th');

    // Para cada linha do corpo:
    for(var i=0; i < rows.length; i++) {

        // pego apenas o nome da fantasia
        var nomeFantasia = nomesDeFantasias[i].textContent.toLowerCase();

        // Se incluir o texto eu deixo a linha a mostra
        if (nomeFantasia.includes(searchText)) {
            rows[i].style.display = '';
        } else { // Senão, eu oculto a linha
            rows[i].style.display = 'none';
        }
    }
});

let currentFantasiaId = null;

document.addEventListener("DOMContentLoaded", function() {

const editarButtons = document.querySelectorAll('[data-modal-target="editar-modal"]');

editarButtons.forEach(button => {
    button.addEventListener("click", function() {
        const fantasiaId = this.getAttribute('data-fantasia-id');

        currentFantasiaId = fantasiaId 

        fetch(`/controle/fantasias/${currentFantasiaId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter os dados da fantasia');
                }
                return response.json();
            })
            .then(
                data => {
                document.getElementById('nome_fantasia_edit').value = data.nome_fantasia;
                document.getElementById('tipo_fantasia_edit').value = data.tipo_fantasia;
                document.getElementById('preco_venda_edit').value = data.preco_venda;
                document.getElementById('preco_aluguel_edit').value = data.preco_aluguel;
            })
            .catch(error => {
                console.error('Erro ao obter os dados da fantasia:', error.message);
            });
        });
    });
});


function editarFantasia() {

    const fantasiaId = currentFantasiaId

    const formData = new FormData(document.getElementById('editar-form'));

    formData.append('fantasia_id', fantasiaId);
    
    fetch(`/controle/fantasias/editar/${fantasiaId}/`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao editar a fantasia');
        }
        window.location.href = '/controle/fantasias/';
    })
    .catch(error => {
        console.error('Erro ao editar a fantasia:', error.message);
    });
}

function excluirFantasia(event) {
    // Previne o comportamento padrão do botão
    event.preventDefault();

    // Obtém o ID da fantasia a partir do atributo data-fantasia-id
    const fantasiaId = event.target.getAttribute('data-fantasia-id');

    // Confirmação de exclusão
    const confirmacao = confirm("Tem certeza que deseja excluir esta fantasia?");
    if (!confirmacao) {
        return;
    }

    // Faz uma requisição para o servidor para excluir a fantasia
    fetch(`/controle/fantasias/deletar/${fantasiaId}/`)
    .then(response => {
        if (response.ok) {
            event.target.closest('tr').remove();
        } else {
            return response.json().then(data => {
                throw new Error(data.message || "Erro ao excluir a fantasia.");
            });
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Erro ao excluir a fantasia: " + error.message);
    });
}