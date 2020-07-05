
function enviarForm(){

  var data = {
      estabelecimento : {
        nomeFantasia : $("#nomeFantasia").val(),
        endereco : {
          logradouro: $("#logradouro").val(),
          complemento: $("#complemento").val(),
          numero: $("#numero").val(),
          cep: $("#cep").val(),
          bairro: $("#bairro").val(),
          cidade: $("cidade").val(),
          uf: $("#uf").val()
        }
      }
  } ;

  console.log(data)

  $.ajax(
    {
        type: 'POST',
        url: 'http://localhost:8080/estabelecimento/salvar',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        error: function error(data)
        {
            console.log(data)

        },
        //dataType: 'json',
        success: function success(data)
        {
            console.log(data);
        }
    });

}
$( document ).ready(function() {
  $(function () {
      $.validator.setDefaults({
        submitHandler: function () {
          enviarForm()
        }
      });
      $('#cadastro-estabelecimento').validate({
        rules: {
        nomeFantasia: {
            required: true,
          },
          logradouro: {
            required: true
          },
          complemento: {
              required: true
            },
          numero: {
              required: true
            },
          cep: {
              required: true
            },
          bairro: {
              required: true
            },
          cidade: {
              required: true
            },
          uf: {
            required: true
          },
        },
        messages: {
        nomeFantasia: {
            required: "Por favor digite o nome fantasia do estabelecimento "
          },
          logradouro: {
            required: "Por favor preencha o logradouro "
          },
          complemento: {
              required: "Por favor preencha o complemento "
          },
          numero: {
              required: "Por favor preencha o número "
            },
          cep: {
              required: "Por favor preencha o cep "
            },
          bairro: {
              required: "Por favor preencha o bairro "
            },
          cidade: {
              required: "Por favor preencha a cidade "
            },
          uf: {
            required: "Por favor preencha a UF "
          }
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