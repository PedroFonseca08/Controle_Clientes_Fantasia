//--------------------------------------------------------//
// Função responsável por editar o cliente
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


//--------------------------------------------------------//
// Função responsável por excluir o cliente
function excluirCliente(event) {

    event.preventDefault();

    const clienteId = event.target.getAttribute('data-cliente-id');

    const confirmacao = confirm("Tem certeza que deseja excluir este cliente?");
    if (!confirmacao) {
        return;
    }

    fetch(`/controle/clientes/deletar/${clienteId}/`)
    .then(response => {
        if (response.ok) {
            event.target.closest('tr').remove();
        } else {
            return response.json().then(data => {
                throw new Error(data.message || "Erro ao excluir o cliente.");
            });
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Erro ao excluir o cliente: " + error.message);
    });
}


//--------------------------------------------------------//
// Função responsável por realizar a busca por nome dos clientes
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


//--------------------------------------------------------//
// Função responsável por requisitar dados do CEP via API
function validateCep(inputId, funcao) {
    var cepInput = document.getElementById(inputId);
    var cepValue = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cepValue.length !== 8) {
        cepInput.value = '';
        alert('O CEP deve ter 8 dígitos.');
        return; 
    }

    var apiUrl = 'https://viacep.com.br/ws/' + cepValue + '/json/';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                return;
            }
            if(funcao == 'E'){
                document.getElementById('logradouro_edit').value = data.logradouro;
                document.getElementById('bairro_logradouro_edit').value = data.bairro;
                document.getElementById('uf_logradouro_edit').value = data.uf;
                document.getElementById('municipio_logradouro_edit').value = data.localidade;
            }
            else if(funcao == 'C'){
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro_logradouro').value = data.bairro;
                document.getElementById('uf_logradouro').value = data.uf;
                document.getElementById('municipio_logradouro').value = data.localidade;
            }
        })
        .catch(error => {
            console.error('Erro ao obter dados do CEP:', error);
        });
}


//--------------------------------------------------------//
// Formatando data para PT-BR
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options);
}


//--------------------------------------------------------//
// Função responsável por limpar os campos de Adicionar Cliente
function limparCampos(){
    document.getElementById('nome').value = "";
    document.getElementById('cpf').value = "";
    document.getElementById('telefone').value = "";
    document.getElementById('telefone2').value = "";
    document.getElementById('cep').value = "";
    document.getElementById('logradouro').value = "";
    document.getElementById('num_logradouro').value = "";
    document.getElementById('complemento_logradouro').value = "";
    document.getElementById('bairro_logradouro').value = "";
    document.getElementById('uf_logradouro').value = "";
    document.getElementById('municipio_logradouro').value = "";
    document.getElementById('data_nasc').value = "";
    document.getElementById('email').value = "";
    document.getElementById('observacao').value = "";
}


//--------------------------------------------------------//
let currentClientId = null;

document.addEventListener("DOMContentLoaded", function() {


    //--------------------------------------------------------//
    const selecionarButtons = document.querySelectorAll('[data-modal-target="editar-modal"]');

    // Função para preencher os dados do modal de Edição do Cliente
    selecionarButtons.forEach(button => {
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
                .then(
                    data => {
                    document.getElementById('nome_edit').value = data.nome;
                    document.getElementById('cpf_edit').value = data.cpf;
                    document.getElementById('telefone_edit').value = data.telefone;
                    document.getElementById('telefone2_edit').value = data.telefone2;
                    document.getElementById('cep_edit').value = data.cep;
                    document.getElementById('logradouro_edit').value = data.logradouro;
                    document.getElementById('num_logradouro_edit').value = data.num_logradouro;
                    document.getElementById('complemento_logradouro_edit').value = data.complemento_logradouro;
                    document.getElementById('bairro_logradouro_edit').value = data.bairro_logradouro;
                    document.getElementById('uf_logradouro_edit').value = data.uf_logradouro;
                    document.getElementById('municipio_logradouro_edit').value = data.municipio_logradouro;
                    document.getElementById('data_nasc_edit').value = data.data_nasc;
                    document.getElementById('email_edit').value = data.email;
                    document.getElementById('observacao_edit').value = data.observacao;
                })
                .catch(error => {
                    console.error('Erro ao obter os dados do cliente:', error.message);
                });
            });
        });


    //--------------------------------------------------------//
    const selecionarButtonsInfo = document.querySelectorAll('[data-modal-target="info-modal"]');
    
    // Função para preencher os dados do modal de Informação do Cliente
    selecionarButtonsInfo.forEach(button => {
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
                .then(
                    data => {
                    document.getElementById('nome_info').value = data.nome;
                    document.getElementById('cpf_info').value = data.cpf;
                    document.getElementById('telefone_info').value = data.telefone;
                    document.getElementById('telefone2_info').value = data.telefone2;
                    document.getElementById('cep_info').value = data.cep;
                    document.getElementById('logradouro_info').value = data.logradouro;
                    document.getElementById('num_logradouro_info').value = data.num_logradouro;
                    document.getElementById('complemento_logradouro_info').value = data.complemento_logradouro;
                    document.getElementById('bairro_logradouro_info').value = data.bairro_logradouro;
                    document.getElementById('uf_logradouro_info').value = data.uf_logradouro;
                    document.getElementById('municipio_logradouro_info').value = data.municipio_logradouro;
                    document.getElementById('data_nasc_info').value = data.data_nasc;
                    document.getElementById('email_info').value = data.email;
                    document.getElementById('observacao_info').value = data.observacao;
                })
                .catch(error => {
                    console.error('Erro ao obter os dados do cliente:', error.message);
                });
            });
        });
    

    //--------------------------------------------------------//
    var telInput = document.getElementById('telefone');
    var telEditInput = document.getElementById('telefone_edit');
    var tel2Input = document.getElementById('telefone2');
    var tel2EditInput = document.getElementById('telefone2_edit');
    var maxChars = 14; 

    // Função para formatar o telefone
    function formatTel(telValue) {
        if (telValue.length >= 2) {
            telValue = '(' + telValue.substring(0, 2) + ')' + telValue.substring(2);
        }

        if (telValue.length >= 9) {
            telValue = telValue.substring(0, 9) + '-' + telValue.substring(9);
        }

        if (telValue.length > maxChars) {
            telValue = telValue.substring(0, maxChars);
        }

        return telValue;
    }

    telInput.addEventListener('input', function () {
        telInput.value = formatTel(telInput.value.replace(/\D/g, ''));
    });

    telEditInput.addEventListener('input', function () {
        telEditInput.value = formatTel(telEditInput.value.replace(/\D/g, ''));
    });
    tel2Input.addEventListener('input', function () {
        tel2Input.value = formatTel(tel2Input.value.replace(/\D/g, ''));
    });

    tel2EditInput.addEventListener('input', function () {
        tel2EditInput.value = formatTel(tel2EditInput.value.replace(/\D/g, ''));
    });


    //--------------------------------------------------------//
    // Função para formatar o CEP
    function formatCEP(cepValue) {
        if (cepValue.length <= 4) {
            return cepValue.replace(/(\d{5})/, '$1');
        } else if (cepValue.length <= 7) {
            return cepValue.replace(/(\d{5})/, '$1-');
        } else {
            return cepValue.replace(/(\d{5})(\d{3})/, '$1-$2').substring(0, 9);
        }
    }

    // CEP em Adicionar Cliente
    var cepInput = document.getElementById('cep');
    cepInput.addEventListener('input', function () {
        cepInput.value = formatCEP(cepInput.value.replace(/\D/g, ''));
    });

    // CEP em Editar Cliente
    var cepEditInput = document.getElementById('cep_edit');
    cepEditInput.addEventListener('input', function () {
        cepEditInput.value = formatCEP(cepEditInput.value.replace(/\D/g, ''));
    });


    //--------------------------------------------------------//
    // Função para formatar o CPF
    function formatCPF(cpfValue) {
        if (cpfValue.length <= 5) {
            return cpfValue.replace(/(\d{3})/, '$1.');
        } else if (cpfValue.length <= 8) {
            return cpfValue.replace(/(\d{3})(\d{3})/, '$1.$2.');
        } else if (cpfValue.length <= 10) {
            return cpfValue.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3-');
        } else if (cpfValue.length <= 11) {
            return cpfValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (cpfValue.length <= 13){
            return cpfValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4-');
        }
        else if (cpfValue.length <= 14){
            return cpfValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }
        return cpfValue.substring(0, 2) + '.' + cpfValue.substring(2, 5) + '.' + cpfValue.substring(5, 8) + '/' + cpfValue.substring(8, 12) + '-' + cpfValue.substring(12, 14);
    }

    // CPF em Adicionar Cliente
    var cpfInput = document.getElementById('cpf');
    cpfInput.addEventListener('input', function () {
        cpfInput.value = formatCPF(cpfInput.value.replace(/\D/g, ''));
    });

    // CPF em Editar Cliente
    var cpfEditInput = document.getElementById('cpf_edit');
    cpfEditInput.addEventListener('input', function () {
        cpfEditInput.value = formatCPF(cpfEditInput.value.replace(/\D/g, ''));
    });


});




