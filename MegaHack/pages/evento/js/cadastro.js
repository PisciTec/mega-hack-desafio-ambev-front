$( document ).ready(function() {
    
    $('.data').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    
    validarForm();

});

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
                dataInicio:
                {
                    required: true
                },
                horaInicio:
                {
                    required: true
                },
                dataTermino:
                {
                    required: true
                },
                horaTermino:
                {
                    required: true
                },
                descricao : {
                    required: true
                }
            },
            messages:
            {
                nome:
                {
                    required: 'Campo obrigatório'
                },
                dataInicio:
                {
                    required: 'Campo obrigatório'
                },
                horaInicio:
                {
                    required: 'Campo obrigatório'
                },
                dataTermino:
                {
                    required: 'Campo obrigatório'
                },
                horaTermino:
                {
                    required: 'Campo obrigatório'
                },
                descricao : {
                    required: 'Campo obrigatório'
                }
            },
            submitHandler: function submitHandler(form)
            {
    
                enviarForm();
    
            }
    
        });

}

function enviarForm(){

    var data = {
        nome : $("#nome").val(),
        dataHoraInicio : `${moment($("#dataInicio").val(), "DD/MM/YYYY").format("YYYY-MM-DD")} ${$("#horaInicio").val()}`,
        dataHoraFim : `${moment($("#dataTermino").val(), "DD/MM/YYYY").format("YYYY-MM-DD")} ${$("#horaTermino").val()}`,
        descricao : $("#descricao").val()
    } ;

    console.log(data)

     $.ajax(
        {
            type: 'POST',
            url: `http://localhost:8080/eventos/salvar`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            error: function error(data)
            {
                console.log(data)
                toastr.error('Erro ao cadastrar evento.')
    
            },
            //dataType: 'json',
            success: function success(data)
            {
                 toastr.success('Evento cadastrado com sucesso.')
                 $("#form").find('.is-valid').removeClass("is-valid");
                $('#form')[0].reset();
            }
        });
}