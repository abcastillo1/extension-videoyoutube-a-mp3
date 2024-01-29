chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'descargarAudio') {
    sendResponse({ message: 'Empezando Descarga...' });
    makeRequest();
    sendResponse({ message: "Descarga terminada." });    
  }
});

function makeRequest() {
  var xhr = new XMLHttpRequest();
  const apiUrl = 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/';
  const videoLink = window.location.href;
    let url = `${apiUrl}?url=${encodeURIComponent(videoLink)}`;
    xhr.open('GET', url, true);
    xhr.setRequestHeader('X-RapidAPI-Key', '7dc059436emsh887e810e6ab07a8p1f4b76jsn8e2536bd72ad');
    xhr.setRequestHeader('X-RapidAPI-Host', 'youtube-mp3-downloader2.p.rapidapi.com');
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr.responseText);
        const dato = JSON.parse(xhr.responseText);
        if (dato.link) {
          const enlaceDescarga = document.createElement('a');
          enlaceDescarga.href = dato.link;
          enlaceDescarga.style.display = 'none';
          document.body.appendChild(enlaceDescarga);
          enlaceDescarga.click();
          document.body.removeChild(enlaceDescarga);          
          alert(`Descargado: ${dato.title} | Peso ${dato.size}`)
        } else {
          console.error('No se encontró un enlace de descarga en la respuesta.');
        }
      } else {
        console.error('Error en la solicitud. Estado:', xhr.status, 'Mensaje:', xhr.statusText);
      }
    };

    xhr.onerror = function () {
      console.error('Error de red al realizar la solicitud.');
    };

    xhr.send();
}