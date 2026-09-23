(function(){
  var WHATSAPP_NUMBER = '5562995397373';

  function generateEventId(){
    return 'evt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
  }

  function trackWhatsappContact(){
    var eventId = generateEventId();

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'whatsapp_contact',
      event_id: eventId,
      event_name: 'Contact'
    });

    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Contact', {}, { eventID: eventId });
      }
    } catch (e) {}

    try {
      if (window.ttq && typeof window.ttq.track === 'function') {
        window.ttq.track('Contact', {}, { event_id: eventId });
      }
    } catch (e) {}

    try {
      var payload = JSON.stringify({
        event_id: eventId,
        event_name: 'Contact',
        event_url: window.location.href,
        referrer: document.referrer || ''
      });
      if (navigator.sendBeacon) {
        var blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/tiktok-event.php', blob);
      } else {
        fetch('/api/tiktok-event.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true
        });
      }
    } catch (e) {}
  }

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

    trackWhatsappContact();

    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(texto);
    window.open(url, '_blank', 'noopener');
    return false;
  };

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('a.whatsapp-float, a.btn-whatsapp').forEach(function(a){
      a.addEventListener('click', function(){ trackWhatsappContact(); });
    });
  });
})();
