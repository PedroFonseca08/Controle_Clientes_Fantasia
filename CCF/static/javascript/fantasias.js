document.getElementById('costume-search').addEventListener('input', function() {
    var searchText = this.value.toLowerCase();

    // Pego todas as divs dentro do catálogo
    var catalogo = document.querySelector('#catalogo').getElementsByTagName('div');

    // Para cada div eu pego o conteúdo textual:
    for(var i=0; i < catalogo.length; i++) {

        var nomeFantasia = catalogo[i].textContent.toLowerCase();

        // Se incluir o texto eu deixo a mostra
        if (nomeFantasia.includes(searchText)) {
            catalogo[i].style.display = '';
        } else { // Senão, eu oculto o item
            catalogo[i].style.display = 'none';
        }
    }
});