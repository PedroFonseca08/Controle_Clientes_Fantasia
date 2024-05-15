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



// ADAPTAR

document.addEventListener('DOMContentLoaded', function () {
    var telInput = document.getElementById('telefone');
    var telEditInput = document.getElementById('telefone_edit');
    var maxChars = 14; // Defina o número máximo de caracteres

    // Função para formatar o telefone
    function formatTel(telValue) {
        if (telValue.length >= 2) {
            // Adiciona os parênteses após os dois primeiros dígitos
            telValue = '(' + telValue.substring(0, 2) + ')' + telValue.substring(2);
        }

        if (telValue.length >= 9) {
            // Adiciona o hífen após os sete primeiros dígitos
            telValue = telValue.substring(0, 9) + '-' + telValue.substring(9);
        }

        // Limita o número máximo de caracteres
        if (telValue.length > maxChars) {
            telValue = telValue.substring(0, maxChars);
        }

        return telValue;
    }

    // Aplica a formatação ao campo telefone
    telInput.addEventListener('input', function () {
        telInput.value = formatTel(telInput.value.replace(/\D/g, ''));
    });

    // Aplica a formatação ao campo de edição de telefone (tel-edit)
    telEditInput.addEventListener('input', function () {
        telEditInput.value = formatTel(telEditInput.value.replace(/\D/g, ''));
    });
});




document.addEventListener('DOMContentLoaded', function () {
    // Função para formatar o CEP
    function formatCEP(cepValue) {
        if (cepValue.length <= 4) {
            // Formata os primeiros 5 dígitos
            return cepValue.replace(/(\d{5})/, '$1');
        } else if (cepValue.length <= 7) {
            // Formata os primeiros 5 dígitos
            return cepValue.replace(/(\d{5})/, '$1-');
        } else {
            // Adiciona o hífen após os 5 primeiros dígitos
            return cepValue.replace(/(\d{5})(\d{3})/, '$1-$2').substring(0, 9);
        }
    }

    // Aplica a formatação ao campo CEP
    var cepInput = document.getElementById('cep');
    cepInput.addEventListener('input', function () {
        cepInput.value = formatCEP(cepInput.value.replace(/\D/g, ''));
    });

    // Aplica a formatação ao campo de edição de CEP (cep-edit)
    var cepEditInput = document.getElementById('cep_edit');
    cepEditInput.addEventListener('input', function () {
        cepEditInput.value = formatCEP(cepEditInput.value.replace(/\D/g, ''));
    });
});



document.addEventListener('DOMContentLoaded', function () {
    // Função para formatar o CPF
    function formatCPF(cpfValue) {
        if (cpfValue.length <= 5) {
            // Formata os primeiros 3 dígitos
            return cpfValue.replace(/(\d{3})/, '$1.');
        } else if (cpfValue.length <= 8) {
            // Formata os primeiros 6 dígitos em grupos de 3
            return cpfValue.replace(/(\d{3})(\d{3})/, '$1.$2.');
        } else if (cpfValue.length <= 10) {
            // Formata os primeiros 9 dígitos em grupos de 3
            return cpfValue.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3-');
        } else if (cpfValue.length <= 11) {
            // Formata os 11 dígitos completos
            return cpfValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (cpfValue.length <= 13){
            // Limita a entrada a 11 dígitos mantendo a formatação correta
            return cpfValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4-');
        }
        else if (cpfValue.length <= 14){
            return cpfValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }
        return cpfValue.substring(0, 2) + '.' + cpfValue.substring(2, 5) + '.' + cpfValue.substring(5, 8) + '/' + cpfValue.substring(8, 12) + '-' + cpfValue.substring(12, 14);
    }

    // Aplica a formatação ao campo CPF
    var cpfInput = document.getElementById('cpf');
    cpfInput.addEventListener('input', function () {
        cpfInput.value = formatCPF(cpfInput.value.replace(/\D/g, ''));
    });

    // Aplica a formatação ao campo de edição de CPF (cpf_edit)
    var cpfEditInput = document.getElementById('cpf_edit');
    cpfEditInput.addEventListener('input', function () {
        cpfEditInput.value = formatCPF(cpfEditInput.value.replace(/\D/g, ''));
    });
});

function validateCPF(inputId) {
    var cpfInput = document.getElementById(inputId);
    var cpfValue = cpfInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cpfValue.length !== 11 && cpfValue.length !== 14 || isNaN(cpfValue)) {
        alert('CPF deve conter 11 dígitos numéricos ou CNPJ deve conter 14 dígitos numéricos.');
        cpfInput.value = ''; // Limpa o campo
    }
}

function validateRG(inputId) {
    var rgInput = document.getElementById(inputId);

    if (rgInput.value.length > 20) {
        rgInput.value = '';
        alert('O RG deve ter 20 dígitos no máximo.');
    }
}

function validateTel(inputId) {
    var telInput = document.getElementById(inputId);
    var telValue = telInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (telValue.length !== 11) {
        alert('Por favor, insira um número de telefone válido com 11 caracteres.');
        telInput.value = '';
    }
}

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
            if ( data.bairro != '' && data.logradouro != ''){
                var endereco = data.bairro + ", " + data.logradouro;
                if(funcao == 'E')
                    document.getElementById('endereco_edit').value = endereco;
                else if(funcao == 'C')
                    document.getElementById('endereco').value = endereco;
            }  
        })
        .catch(error => {
            console.error('Erro ao obter dados do CEP:', error);
        });
}


function validateEndereco(inputId) {
    var endInput = document.getElementById(inputId);

    if (endInput.value.length > 150) {
        endInput.value = '';
        alert('O endereço deve ter 150 caracteres no máximo.');
    }
}

function validateObs(inputId) {
    var obsInput = document.getElementById(inputId);

    if (obsInput.value.length > 200) {
        obsInput.value = '';
        alert('A observação deve ter 200 caracteres no máximo.');
    }
}

function validateNome(inputId) {
    var nomeInput = document.getElementById(inputId);

    if (nomeInput.value.length > 100) {
        nomeInput.value = '';
        alert('O nome deve ter 100 caracteres no máximo.');
    }
}