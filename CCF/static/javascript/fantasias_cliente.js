// document.addEventListener("DOMContentLoaded", function() {

//     const fantasiaButtons = document.querySelectorAll('[data-modal-target="fantasia-modal"]');
    
//     fantasiaButtons.forEach(button => {
//         button.addEventListener("click", function() {
//             const clienteId = this.getAttribute('data-cliente-id');
            
//             idClienteAtual = clienteId
    
//             fetch(`/controle/clientes/${clienteId}/`)
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error('Erro ao obter os dados do cliente fantasia');
//                     }
//                     toggleDataFim();
//                     return response.json();
//                 })
//                 .then(
//                     data => {
//                     document.getElementById('nomeCF').value = data.nome;
//                 })
//                 .catch(error => {
//                     console.error('Erro ao obter os dados do cliente:', error.message);
//                 });
//             });
//         });
//     });
    

// document.addEventListener("DOMContentLoaded", function() {

//     const fantasiaButtons = document.querySelectorAll('[data-modal-target="fantasia-modal"]');

//     fantasiaButtons.forEach(button => {
//         button.addEventListener("click", function() {
//             const clienteId = this.getAttribute('data-cliente-id');

//             fetch(`/controle/clientes/historico/${clienteId}/`)
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error('Erro ao obter os dados do cliente fantasia');
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     const tbody = document.getElementById('fantasias-table-body');
//                     tbody.innerHTML = '';

//                     data.sort((a, b) => {
//                         // Converta as datas para objetos Date para poder compará-las
//                         const dateA = new Date(a.data_inicio_fantasia);
//                         const dateB = new Date(b.data_inicio_fantasia);
                        
//                         // Compare as datas
//                         return dateB - dateA;
//                     }).forEach(async transacao => {
//                         const row = document.createElement('tr');
//                         row.className = 'bg-white border-b';

//                         const nomeFantasia = await recuperarNomeFantasia(transacao.fantasia_id)

//                         const fantasiaCell = document.createElement('td');
//                         fantasiaCell.className = 'px-6 py-4';
//                         fantasiaCell.textContent = nomeFantasia;
                    
//                         const precoFantasiaCell = document.createElement('td');
//                         precoFantasiaCell.className = 'px-6 py-4';
//                         precoFantasiaCell.textContent = transacao.preco_fantasia;
                    
//                         const tipoFantasiaCell = document.createElement('td');
//                         tipoFantasiaCell.className = 'px-6 py-4';
//                         tipoFantasiaCell.textContent = transacao.tipo_transacao == 'C' ? 'Compra' : 'Aluguel';
                    
//                         const dataIFantasiaCell = document.createElement('td');
//                         dataIFantasiaCell.className = 'px-6 py-4';
//                         dataIFantasiaCell.textContent = formatDate(transacao.data_inicio_fantasia);
                    
//                         const dataFFantasiaCell = document.createElement('td');
//                         dataFFantasiaCell.className = 'px-6 py-4';
//                         dataFFantasiaCell.textContent = transacao.tipo_transacao != 'C' ? formatDate(transacao.data_fim_fantasia) : '';
                    
//                         const baixaFantasiaCell = document.createElement('td');
//                         baixaFantasiaCell.className = 'px-6 py-4';
//                         baixaFantasiaCell.textContent = transacao.baixa_fantasia;
                    
//                         row.appendChild(fantasiaCell);
//                         row.appendChild(precoFantasiaCell);
//                         row.appendChild(tipoFantasiaCell);
//                         row.appendChild(dataIFantasiaCell);
//                         row.appendChild(dataFFantasiaCell);
//                         row.appendChild(baixaFantasiaCell);
                    
//                         tbody.appendChild(row);
//                     });
                    
//                 })
//                 .catch(error => {
//                     console.error('Erro ao obter os dados do cliente:', error.message);
//                 });
//         });
//     });
// });

let idClienteAtual = null;

function adicionarTransacao() {

    const fantasiaButtons = document.querySelectorAll('[data-modal-target="fantasia-modal"]');

    const clienteId = document.getAttribute('data-cliente-id');

    const formData = new FormData(document.getElementById('fantasia-form'));

    console.log("oi")

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
        document.getElementById('fantasia-form').reset();

        const tbody = document.getElementById('fantasias-table-body');
        tbody.innerHTML = '';

        data.sort((a, b) => {
            // Converta as datas para objetos Date para poder compará-las
            const dateA = new Date(a.data_inicio_fantasia);
            const dateB = new Date(b.data_inicio_fantasia);
            
            // Compare as datas
            return dateB - dateA;
        }).forEach(async transacao => {

            const nomeFantasia = await recuperarNomeFantasia(transacao.fantasia_id);

            const row = document.createElement('tr');
            row.className = 'bg-white border-b';
        
            const fantasiaCell = document.createElement('td');
            fantasiaCell.className = 'px-6 py-4';
            fantasiaCell.textContent = nomeFantasia;
        
            const precoFantasiaCell = document.createElement('td');
            precoFantasiaCell.className = 'px-6 py-4';
            precoFantasiaCell.textContent = transacao.preco_fantasia;
        
            const tipoFantasiaCell = document.createElement('td');
            tipoFantasiaCell.className = 'px-6 py-4';
            tipoFantasiaCell.textContent = transacao.tipo_transacao == 'C' ? 'Compra' : 'Aluguel';
        
            const dataIFantasiaCell = document.createElement('td');
            dataIFantasiaCell.className = 'px-6 py-4';
            dataIFantasiaCell.textContent = formatDate(transacao.data_inicio_fantasia);
        
            const dataFFantasiaCell = document.createElement('td');
            dataFFantasiaCell.className = 'px-6 py-4';
            dataFFantasiaCell.textContent = transacao.tipo_transacao != 'C' ? formatDate(transacao.data_fim_fantasia) : '';
        
            const baixaFantasiaCell = document.createElement('td');
            baixaFantasiaCell.className = 'px-6 py-4';
            baixaFantasiaCell.textContent = transacao.baixa_fantasia;
        
            row.appendChild(fantasiaCell);
            row.appendChild(precoFantasiaCell);
            row.appendChild(tipoFantasiaCell);
            row.appendChild(dataIFantasiaCell);
            row.appendChild(dataFFantasiaCell);
            row.appendChild(baixaFantasiaCell);
        
            tbody.appendChild(row);
        });
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

        // Já coloca o valor mais barato, para ter uma noção na hora de preencher a transação
        precoContainer.value = dados.preco_aluguel;
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