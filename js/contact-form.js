(function(){
  var WHATSAPP_NUMBER = '5562995397373';

  window.enviarParaWhatsApp = function(form){
    var nome = (form.querySelector('#nome') || {}).value || '';
    var telefone = (form.querySelector('#telefone') || {}).value || '';
    var protocoloEl = form.querySelector('#protocolo');
    var protocolo = protocoloEl ? protocoloEl.value : '';
    var mensagemEl = form.querySelector('#mensagem');
    var mensagem = mensagemEl ? mensagemEl.value.trim() : '';

    var texto = 'Olá! Meu nome é ' + nome.trim() + '.' +
      '\nTelefone: ' + telefone.trim() +
      '\nProtocolo de interesse: ' + protocolo.trim() +
      (mensagem ? '\nMensagem: ' + mensagem : '');

    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(texto);
    window.open(url, '_blank', 'noopener');
    return false;
  };
})();
