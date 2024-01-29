document.addEventListener('DOMContentLoaded', function() {
  var descargarMP3 = document.getElementById('boton1');
  var texto = document.getElementById('texto');  
  descargarMP3.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var message = { action: 'descargarAudio' };
      chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
        if (response) {
          texto.textContent = response.message;
        } else {
          texto.textContent = "Lo sentimos, solo puede utilizar la extensión en la plataforma YOUTUBE";          
        }
      });
    });
  });  
});

