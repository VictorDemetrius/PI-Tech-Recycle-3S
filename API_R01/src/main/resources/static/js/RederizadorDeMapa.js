
var mapElement = document.getElementById("map");

var map = L.map(mapElement).setView([0, 0], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

// Array para armazenar os marcadores
var markers = [];

function geocode(address) {
  var url = "https://nominatim.openstreetmap.org/search";
  var params = {
    q: address,
    format: "json",
  };

  // Fazendo a requisição HTTP para a API
  fetch(url + "?" + new URLSearchParams(params))
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Verificando se a resposta possui resultados
      if (data.length > 0) {
        // Obtendo as coordenadas do primeiro resultado
        var latitude = parseFloat(data[0].lat);
        var longitude = parseFloat(data[0].lon);

        // Adicionando marcador ao mapa
        var marker = L.marker([latitude, longitude]);
        
        // Adicionando o marcador ao array de marcadores
        markers.push(marker);

        // Adicionando marcador ao mapa
        marker.addTo(map);

        // Ajustando a visão do mapa para incluir todos os marcadores
        var group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds());
      }
    })
    .catch(function (error) {
      console.error("Erro ao geocodificar o endereço:", error);
    });
}

var endereco_1 = "Av. aguia de haia, 2000, São Paulo";
geocode(endereco_1);
