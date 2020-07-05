
function enviarForm(){
    var id = recuperarId();
    var data = {
          id : id,
          nome : $("#nomeFantasia").val(),
          qtdBanheiros: $("#qtdBanherio"). val(),
          proprietario : {
            "id": 1,
          },
          endereco : {
            "id": 1,
          }
    } ;
  
    console.log(data)
  
    $.ajax(
      {
          type: 'PUT',
          url: 'https://desafio-ambev.herokuapp.com/estabelecimento/atualizar',
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(data),
          error: function error(data)
          {
              console.log(data.responseText)
  
          },
          //dataType: 'json',
          success: function success(data)
          {
              console.log(data.responseText);
          }
      });
  
  }
  $( document ).ready(function() {

    var id = recuperarId();
    $(function () {
        dado = id;
        $.ajax(
            {
                type: 'PATCH',
                url: 'https://desafio-ambev.herokuapp.com/estabelecimento/buscar/'+dado,
                contentType: "application/json; charset=utf-8",
                data: dado,
                error: function error(data)
                {
                    console.log(data)
        
                },
                dataType: 'json',
                success: function success(data)
                {
                    console.log(data);
                    $("#nomeFantasia").val(data.nome);
                    $("#qtdBanherio"). val(data.qtdBanheiros);
                }
            });    

    
    });

    $("#btn-cancelar").on('click', function(){
        window.location.assign("listagemEstabelecimento.html");
    });

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

function recuperarId(){
    var url_atual = window.location.href;
    resultado = url_atual.split("=");
    var ultimo = $(resultado).get(-1);
    return ultimo;
}