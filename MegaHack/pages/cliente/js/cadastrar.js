$( document ).ready(function() {
    
    validarForm();
    

});


function validarForm(){

    
    
    $("#form").validate(
        {
         
            // Rules for form validation
            rules:
            {
                nome:
                {
                    required: true
                },
                email:
                {
                    required: true
                },
                senha:
                {
                    required: true
                },
                senha2:
                {
                    required: true
                }
            },
            messages:
            {
                nome:
                {
                    required: 'Campo obrigatório'
                },
                email:
                {
                    required: 'Campo obrigatório'
                },
                senha:
                {
                    required: 'Campo obrigatório'
                },
                senha2:
                {
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
        usuario : {
            email : $("#email").val(),
            senha : $("#senha").val(),
            perfil : 'CLIENTE'
        }
    } ;

    console.log(data)

    $.ajax(
        {
            type: 'POST',
            url: `https://desafio-ambev.herokuapp.com/clientes/salvar`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            error: function error(data)
            {
                console.log(data)
    
            },
            //dataType: 'json',
            success: function success(data)
            {
                  $(".alert").addClass("alert-success").text("Cadastro realizado com sucesso").slideDown('slow').delay(3000).slideUp('slow');

                  $('#form')[0].reset();
            }
        });
    
}

function objectifyForm(formArray) {//serialize data function

    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
      returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
  }