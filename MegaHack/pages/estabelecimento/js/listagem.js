$(document).ready(function() {
    let ajax = new XMLHttpRequest();
    ajax.open('GET', 'https://desafio-ambev.herokuapp.com/estabelecimento/listar');
    ajax.send();
    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4 && ajax .status == 200){
            data =  ajax.response;
            var objetos = JSON.parse(data)
            montarTabela(objetos);
        }

    }
    
    
} );

function montarTabela(objetos) {
    $(objetos).each(function(index, element) {
        console.log(element)
        $("#corpo").append('' +
        '<tr>'+
            '<td>'+element.id+'</td>'+
            '<td>'+element.nome+'</td>'+                                
            '<td>'+element.qtdBanheiros+'</td>'+
            '<td>'+element.endereco.logradouro+'</td>'+ 
            '<td class="project-actions text-right">' +
             '<form>'+
             '<button type="button" class="btn btn-primary btn-sm" id="btn-visualizar"><i class="fas fa-folder"></i>View</button> '+
             '<button type="button" class="btn btn-info btn-sm" id="btn-editar"><i class="fas fa-pencil-alt"></i>Edit</button> '+
             '<button type="button" class="btn btn-danger btn-sm btn-deletar" id="btn-deletar" ><i class="fas fa-trash"></i>Delete</button> '+
             '</form>'+
             '</td>'+

       '</tr>');
       $("#btn-visualizar").on('click', function(){
            window.location.assign("estabelecimento.html");
        });
        $("#btn-editar").on('click', function(){
            window.location.assign("editarEstabelecimento.html?id="+element.id);
        });
        $("#btn-deletar").on('click', function(){
        });
      });
    console.log(data);
    
}


