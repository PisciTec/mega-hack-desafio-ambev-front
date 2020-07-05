
$( document ).ready(function() {
    
    montarDataTable();
    btsn();
});

function montarDataTable(){
    var table = $('#table-cardapio').DataTable(
        {
    
            responsive: true,
            lengthChange: false,
            "processing": true,
            "ajax":
            {
                "url": "https://localhost:8080/cardapios/listar",
                dataSrc: ''
            },
            "columns": [
            {
                "data": "nome"
            },
            {
                "data": "preco"
                
            },
            {
                "data": "descricao"
            },
            {
                'mRender': function (data, type, row)
                {    
                    console.log(row);
                    return `<a  type="button" class="btn btn-secondary btn-sm btn-editar" title="Editar serviço" data-id="${row.id}"><i class="fa fa-lg fa-edit"></i></a>
                      <a  type="button" class="btn btn-danger btn-sm btn-excluir"  title="Excluir serviço" data-id="${row.id}" ><i class="fa fa-lg fa-trash"></i></a>`
                },
            }],
            buttons: [ {
                text: 'Novo',
                className: 'btn-primary btn-novo',
                title: 'Clique para cadastrar um novo serviço',
                action: function ( e, dt, node, config ) {
                    window.location = 'cadastro.html';
                }
            } ],
            "oLanguage":
            {
                "sEmptyTable": "Não foi encontrado nenhum registo",
                "sLoadingRecords": "A carregar...",
                "sProcessing": "A processar...",
                "sLengthMenu": "Mostrar _MENU_ registos",
                "sZeroRecords": "Não foram encontrados resultados",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registos",
                "sInfoEmpty": "Mostrando de 0 até 0 de 0 registos",
                "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
                "sInfoPostFix": "",
                "sSearch": "Procurar:",
                "sUrl": "",
                "oPaginate":
                {
                    "sFirst": "Primeiro",
                    "sPrevious": "Anterior",
                    "sNext": "Seguinte",
                    "sLast": "Último"
                },
                "oAria":
                {
                    "sSortAscending": ": Ordenar colunas de forma ascendente",
                    "sSortDescending": ": Ordenar colunas de forma descendente"
                }
            },
            initComplete : function(){
                console.log($("#table-cardapio").parents())
                table.buttons().container().appendTo( '#table-cardapio_wrapper .col-md-6:eq(0)');
            }
    
        });
    
}

function btsn(){

    $(".btn-editar").on("click",function(){

        $.ajax(
            {
                type: verbo,
                url: `/api/servicos/${acao}`,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                error: function error(data)
                {
                    console.log(data)
                    lancarToastr("error",data);
        
                },
                //dataType: 'json',
                success: function success(data)
                {
                    window.location = 'cadastro.html';

                    
                    $('.modal-loading').modal('show');
                    $('#modal-servico').modal('hide');
                   
                    lancarToastr("success",`Serviço ${acao == "cadastrar" ? "salvo" : "editado"} com sucesso.`);
                    
        
                }
            });

    });
}