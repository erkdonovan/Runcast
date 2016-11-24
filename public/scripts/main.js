var appRunning = {};

//search for users postal code
appRunning.getLocation = function(postalCode) {
  $.ajax({
    url: 'http://api.wunderground.com/api/62a926f01f62970f/geolookup/q/' + postalCode + '.json',
    method: 'get',
    dataType: 'json'
  }).then(function(userPostalCode) {
    //console.log(userPostalCode)
    appRunning.didItFail(userPostalCode)
  });
}

appRunning.didItFail = function(maybe) {
  //console.log('maybe?', maybe)
  if (maybe.response.error != undefined ) {

    $('.failed').text(maybe.response.error.description)

  } else {

    var usersLocation = maybe.location.l
    $('.failed').hide();
    $('.weather').show();
    $('.clothing').show();
    appRunning.getWeather(usersLocation)

  }
}

//get weather for the users location q/textcode
appRunning.getWeather = function(zmw) {
  $.ajax({
    url: 'http://api.wunderground.com/api/62a926f01f62970f/conditions/' + zmw + '.json',
    method: 'get',
    dataType: 'json'
  }).then(function(weatherData) {
    //console.log(weatherData)
    currentWeather = weatherData.current_observation
    appRunning.displayWeather(currentWeather);
  });
}

//get the users location 
appRunning.findLocation = function() {

  $('form').on('submit', function(e) {
    e.preventDefault();

    var searchfield = $('input[type=search]').val();
    //console.log(searchfield)
    appRunning.getLocation(searchfield)

  });

}

//display weather for Toronto 
appRunning.displayWeather = function(weather) {
  //console.log(weather)
  $('.location').text(weather.display_location.full);

  if (weather.feelslike_c != '') {
    $('.temp').text('the current temperature is ' + weather.feelslike_c + '° Celsius');  
  } else {

  }

  if (weather.weather != '') {
    $('.currentweather').text(' and ' + weather.weather);
  } else {

  }

  appRunning.displayClothing(weather)
}

//display clothing to wear running based on weather
appRunning.displayClothing = function(clothing) {
  //console.log(clothing)

  $('.userlocation').hide();
  $('.tanktop').hide();
  $('.shorts').hide();
  $('.tshirt').hide();
  $('.longsleeve').hide();
  $('.coat').hide();
  $('.leggings').hide();
  $('.mittens').hide();
  $('.toque').hide();

  if (clothing.feelslike_c > 35) {

    $('.clothing').hide();
    $('.toohot').show();

  } else if (clothing.feelslike_c > 20) {
    
    //tank top and shorts
    $('.tanktop').css({'display': 'inline-block'});
    $('.shorts').css({'display': 'inline-block'});
  
  } else if (clothing.feelslike_c > 5) {
    
    //tshirt and shorts
    $('.tshirt').css({'display': 'inline-block'});
    $('.shorts').css({'display': 'inline-block'});

  } else if (clothing.feelslike_c > 0) {

    $('.longsleeve').css({'display': 'inline-block'});
    $('.leggings').css({'display': 'inline-block'});

  } else if (clothing.feelslike_c > -5) {

    $('.longsleeve').css({'display': 'inline-block'});
    $('.leggings').css({'display': 'inline-block'});
    $('.mittens').css({'display': 'inline-block'});
    $('.toque').css({'display': 'inline-block'});


  } else if (clothing.feelslike_c > -15) {

    $('.tshirt').css({'display': 'inline-block'});
    $('.coat').css({'display': 'inline-block'});
    $('.leggings').css({'display': 'inline-block'});
    $('.mittens').css({'display': 'inline-block'});
    $('.toque').css({'display': 'inline-block'});

  } else {

    $('.clothing').hide();
    $('.toocold').show();

  }

  // if rain show light jacket

  // if wind and below 5 show toque

}

//Runs all the stuffs
appRunning.init = function () {
  appRunning.findLocation();
  //$('.results').empty();
};

$(document).ready(function() {
  appRunning.init();
});