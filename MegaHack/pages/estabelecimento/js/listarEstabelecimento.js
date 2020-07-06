
$( document ).ready(function() {
    
    $('.data').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    
    validarForm();
    montarDataTable();
    btns();

    var tabelaBody = $("#table-eventos > tbody");

    iniciarEdicao(tabelaBody);
    inciarExclusao(tabelaBody);
});

function montarDataTable(){
    var table = $('#table-eventos').DataTable(
        {
    
            responsive: true,
            lengthChange: false,
            "processing": true,
            "ajax":
            {
                "url": "https://desafio-ambev.herokuapp.com/estabelecimento/listar",
                dataSrc: ''
            },
            "columns": [
            {
                "data": "id"
            },
            {
                "data": "nome"
                
            },
            {
                "data": "qtdBanheiros"
            },
            {
                "data": "endereco.logradouro"
            },
            {
                'mRender': function (data, type, row)
                {    
                    return `<a  type="button" class="btn btn-secondary btn-sm btn-editar" title="Editar serviço" data-id="${row.id}"><i class="fa fa-lg fa-edit"></i></a>
                      <a  type="button" class="btn btn-danger btn-sm btn-excluir"  title="Excluir serviço" data-id="${row.id}"  ><i class="fa fa-lg fa-trash"></i></a>`
                },
            }],
            buttons: [ {
                text: 'Novo',
                className: 'btn-primary btn-novo',
                title: 'Clique para cadastrar um novo serviço',
                action: function ( e, dt, node, config ) {
                    $('.evento-form').slideDown('slow');
                    $(".listagem").slideUp('slow');
                    $(".btn-salvar").removeAttr('data-id');
        		    $(".btn-salvar").attr("acao", "salvar");
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
                console.log($("#table-eventos").parents())
                table.buttons().container().appendTo( '#table-eventos_wrapper .col-md-6:eq(0)');
            }
    
        });
    
}

function btns(){

    $(".btn-cancelar").on("click",function(){
		$(".evento-form").slideUp('slow');
		$('.listagem').slideDown('slow');
		$("#form").find('.is-valid').removeClass("is-valid");
    });
    
    $(".btn-confirm-exclusao").on("click",function(){
        $('#modal-excluir').modal('toggle');
        $.ajax(
            {
                type: "DELETE",
                url: `https://desafio-ambev.herokuapp.com/estabelecimento/deletar/${$(this).attr('id')}`,
                cache: false,
                error: function error(data)
                {
                    
                    console.log(data)
                    toastr.error('Erro ao excluir estabelecimento.')
    
                },
                success: function ()
                {
                    toastr.success('Estabelecimento excluido com sucesso.')
                    
                    setTimeout(function(){location.reload()}, 1000);
    
                }
            });
    
    });

}

function validarForm(){

    jQuery.validator.setDefaults({
		errorElement: 'div',
	    errorPlacement: function (error, element) {
	        error.addClass('invalid-feedback');
	    	$(element).after(error);
	    },
	    highlight: function (element, errorClass, validClass) {
	        $(element).addClass('is-invalid');
	        $(element).removeClass('is-valid');
	    },
	    unhighlight: function (element, errorClass, validClass) {
	        $(element).removeClass('is-invalid');
	        $(element).addClass('is-valid');
	    }
	});


    $("#form").validate(
        {
         
            // Rules for form validation
            rules:
            {
                nome:
                {
                    required: true
                },
                logradouro:
                {
                    required: true
                },
                numero:
                {
                    required: true
                },
                bairro:
                {
                    required: true
                },
                cidade:
                {
                    required: true
                },
                uf : {
                    required: true
                },
                complemento : {
                    required: true
                }
            },
            messages:
            {
                nome:
                {
                    required: 'Campo obrigatório'
                },
                logradouro:
                {
                    required: 'Campo obrigatório'
                },
                numero:
                {
                    required: 'Campo obrigatório'
                },
                bairro:
                {
                    required: 'Campo obrigatório'
                },
                cidade:
                {
                    required: 'Campo obrigatório'
                },
                uf : {
                    required: 'Campo obrigatório'
                },
                complemento : {
                    required: 'Campo obrigatório'
                }
            },
            submitHandler: function submitHandler(form)
            {
                enviarForm($(".btn-salvar").attr("acao"), $(".btn-salvar").attr("data-id"));
            }
    
        });

}

function enviarForm(acao,id){

    var data = {
        nome : $("#nome").val(),
        qtdBanheiros: $("#qtdBanheiros").val(),
        endereco : {
          "logradouro" : $("#logradouro").val(),
          "numero" : $("#numero").val(),
          "bairro" : $("#bairro").val(),
          "cidade" : $("#cidade").val(),
          "uf" : $("#uf").val(),
          "complemento" : $("#complemento").val(),
        },
        proprietario : {
          "id": 1,
        }
  } ;

    console.log(data);

    var verbo;

    if(!id){
		verbo = 'POST';
	}else{
		verbo = 'PUT';
	}

     $.ajax(
        {
            type: verbo,
            url: `https://desafio-ambev.herokuapp.com/estabelecimento/${acao}`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            error: function error(data)
            {
                console.log(data)
                toastr.error('Erro ao cadastrar estabelecimento.')
    
            },
            //dataType: 'json',
            success: function success(data)
            {
                if(id){
                    toastr.success('Estabelecimento editado com sucesso.')
                }else{
                    toastr.success('Estabelecimento cadastrado com sucesso.')
                }
                $("#form").find('.is-valid').removeClass("is-valid");
                $('#form')[0].reset();
                setTimeout(function(){location.reload()}, 1000);
            }
        });
}

function iniciarEdicao(tabelaBody)
{
	console.log(tabelaBody)
	tabelaBody.on("click", "a.btn-editar", function (e)
	{
		$('.evento-form').slideDown('slow');
        $(".listagem").slideUp('slow');
		$('#form')[0].reset();
		$(".btn-salvar").attr("acao", "atualizar");
		$(".btn-salvar").attr("data-id", $(this).attr('data-id'));
		$.ajax(
				{
					type: "PATCH",
					url: "https://desafio-ambev.herokuapp.com/estabelecimento/buscar/" + $(this).attr('data-id'),
					cache: false,
					error: function error(data)
					{	
                         console.log(data)
                         toastr.error('Erro ao buscar estabelecimentos.')

					},
					success: function (data)
					{
                        $("#nome").val(data.nome);
                        $("#logradouro").val(data.endereco.logradouro);
                        $("#bairro").val(data.endereco.bairro);
                        $("#cidade").val(data.endereco.cidade);
                        $("#uf").val(data.endereco.uf);
                        $("#numero").val(data.endereco.numero);
                        $("#complemento").val(data.endereco.complemento);
                        $("#qtdBanheiros").val(data.qtdBanheiros);
					}
				});
	});

}

function inciarExclusao(tabelaBody)
{
	

	tabelaBody.on("click", "a.btn-excluir", function (e)
	{
        let id = $(this).attr('data-id');

		$('#modal-excluir').modal('toggle');
		$('.btn-confirm-exclusao').attr('id',id);

	});
}

