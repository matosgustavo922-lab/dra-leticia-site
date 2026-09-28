(function(){
  var WHATSAPP_NUMBER = '5562995397373';
  var UTM_STORAGE_KEY = 'dla_utm_source';

  function captureUtmSource(){
    try {
      var params = new URLSearchParams(window.location.search);
      var utm = params.get('utm_source');
      if (utm) {
        sessionStorage.setItem(UTM_STORAGE_KEY, utm.toLowerCase());
      }
    } catch (e) {}
  }

  function getOrigem(){
    try {
      var utm = sessionStorage.getItem(UTM_STORAGE_KEY);
      if (utm === 'meta') return 'meta';
      if (utm === 'instagram') return 'instagram';
      return 'site';
    } catch (e) {
      return 'site';
    }
  }

  function buildProtocolMessage(protocolo){
    var origem = getOrigem();
    if (origem === 'meta') {
      return 'Olá! Vi o anúncio do ' + protocolo + ' e quero saber se é indicado pro meu caso.';
    }
    if (origem === 'instagram') {
      return 'Olá! Vi o ' + protocolo + ' no Instagram da Dra. Letícia e quero saber se é indicado pro meu caso.';
    }
    return 'Olá! Vi o ' + protocolo + ' no site da Dra. Letícia e quero saber se é indicado pro meu caso.';
  }

  captureUtmSource();

  function generateEventId(){
    return 'evt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
  }

  function trackWhatsappClick(posicaoBotao){
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'clique_whatsapp',
        pagina: window.location.pathname,
        posicao_botao: posicaoBotao
      });
    } catch (e) {}
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
    trackWhatsappClick('formulario_contato');

    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(texto);
    window.open(url, '_blank', 'noopener');
    return false;
  };

  function applyProtocolMessage(a){
    try {
      var protocolo = a.getAttribute('data-protocolo');
      if (protocolo) {
        var texto = buildProtocolMessage(protocolo);
        a.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(texto);
      }
    } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('a.whatsapp-float').forEach(function(a){
      applyProtocolMessage(a);
      a.addEventListener('click', function(){
        trackWhatsappContact();
        trackWhatsappClick('flutuante');
      });
    });
    document.querySelectorAll('a.btn-whatsapp').forEach(function(a){
      applyProtocolMessage(a);
      a.addEventListener('click', function(){
        trackWhatsappContact();
        trackWhatsappClick('hero');
      });
    });
  });
})();
