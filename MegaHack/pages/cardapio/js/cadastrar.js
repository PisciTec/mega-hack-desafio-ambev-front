$( document ).ready(function() {
    
    validarForm();
    

});


function validarForm(){

    
    
    $("#form").validate(
        {
         
            // Rules for form validation
            rules:
            {
                Produto:
                {
                    required: true
                },
                Tipo:
                {
                    required: true
                },
            },
            messages:
            {
                Produto:
                {
                    required: 'Campo obrigatório'
                },
                Tipo:
                {
                    required: 'Campo obrigatório'
                },
            },
            submitHandler: function submitHandler(form)
            {
    
                enviarForm();
    
            }
    
        });
}

function enviarForm(){


    var e = document.getElementById("tipo");
  var strUser = e.options[e.selectedIndex].value;
    var data = {
        produtos : [{
            nome: $("#nome").val(),
            tipo: strUser,
            descricao: $("#descricao").val(),
            preco: $("#preco").val()
        }
    ]
        
    } ;

    console.log(data)

    $.ajax(
        {
            type: 'POST',
            url: `https://desafio-ambev.herokuapp.com/cardapios/salvar`,
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