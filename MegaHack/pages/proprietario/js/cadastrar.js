$( document ).ready(function() {

    $(function () {
        $.validator.setDefaults({
          submitHandler: function () {
            var form = $("#cadastroproprietario")
            enviarForm(form)
          }
        });
        $('#cadastroproprietario').validate({
          rules: {
            nome: {
                required: true,
              },
            email: {
              required: true,
              email: true,
            },
            senha: {
              required: true,
              minlength: 5
            },
            confirm: {
                required: true,
                minlength: 5,
                equalTo : "#senha"
            },
            terms: {
              required: true
            },
          },
          messages: {
            email: {
              required: "Please enter a email address",
              email: "Please enter a vaild email address"
            },
            senha: {
              required: "Favor forneça sua senha",
              minlength: "Your password must be at least 5 characters long"
            },
            confirm:
                {
                    required: 'Campo obrigatório.',
                    minlength : 'Minímo de 5 caracteres.',
                    equalTo : 'Senha de confirmação não confere.'
                },
            terms: "Please accept our terms"
          },
          errorElement: 'span',
          errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
          },
          highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
          },
          unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
          }
        });
      });
});

function enviarForm(form){
    var data = {
        nome : $("#nome").val(),
        usuario : {
            email : $("#email").val(),
            senha : $("#senha").val(),
            perfil : 'DONO'
        }
    };
    console.log(data)
    $.ajax(
        {
            type: 'POST',
            url: "https://desafio-ambev.herokuapp.com/proprietarios/salvar",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            error: function error(data)
            {
                console.log(data)

            },
            dataType: 'json',
            success: function success(data)
            {
                console(data);
            }
        });
}