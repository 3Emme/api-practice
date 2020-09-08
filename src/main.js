import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

   function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    }
  });
  // Gif Event Handler
$('#gifBtn').click(function() {
  const inputtedSearchTerm = $("#giphy").val();
  $("#giphy").val("");

  let request = new XMLHttpRequest;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${inputtedSearchTerm}&limit=25&offset=0&rating=g&lang=en`

  request.onreadystatechange = function () {
    if(this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      getElements(response);
    };
  };

  request.open("GET", url, true);
  request.send();

  function getElements(response) {
    $(".showGif").html(`"<img src=${response.embed_url}>"`);
  };
});

});