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
  $('.temp').text(weather.feelslike_c);
  $('.currentweather').text(weather.weather);
  $('.weather_icon').attr({
    src: weather.icon_url,
    alt: weather.weather
  });

  appRunning.displayClothing(weather)
}

//weather icon http://icons.wxug.com/i/c/i/ICON.gif

//display clothing to wear running based on weather
appRunning.displayClothing = function(clothing) {
  //console.log(clothing)

  //TANK TOP
  var $tanktopArtcile = $('article').addClass('tanktop');
  var $tanktopImg = $('img').attr({'src': 'assets/noun_644776_cc.svg', 'alt': 'Tank top'});
  var $tanktopP  = $('p').text('Tank Top');
  $tanktopArtcile.append($tanktopP, $tanktopImg)

  //SHORTS
  var $shortsArtcile = $('article').addClass('shorts');
  var $shortsImg = $('img').attr({'src': 'assets/noun_644800_cc.svg', 'alt': 'Shorts'});
  var $shortsP  = $('p').text('Shorts');
  $shortsArtcile.append($shortsP, $shortsImg)

  //TSHIRTS
  var $tshirtArtcile = $('article').addClass('tshirt');
  var $tshirtImg = $('img').attr({'src': 'assets/noun_644778_cc.svg', 'alt': 'tshirt'});
  var $tshirtP  = $('p').text('tshirt');
  $tshirtArtcile.append($tshirtP, $shortsImg)

  //HOODIE 
  var $sweaterArtcile = $('article').addClass('sweater');
  var $sweaterImg = $('img').attr({'src': 'assets/noun_644778_cc.svg', 'alt': 'sweater'});
  var $sweaterP  = $('p').text('sweater');
  $sweaterArtcile.append($sweaterP, $shortsImg)


  //PANTS
  var $pantsArtcile = $('article').addClass('pants');
  var $pantsImg = $('img').attr({'src': 'assets/noun_644778_cc.svg', 'alt': 'pants'});
  var $pantsP  = $('p').text('pants');
  $pantsArtcile.append($pantsP, $shortsImg)

  //LONGSLEEVE
  var $longsleeveArtcile = $('article').addClass('longsleeve');
  var $longsleeveImg = $('img').attr({'src': 'assets/noun_644778_cc.svg', 'alt': 'longsleeve'});
  var $longsleeveP  = $('p').text('longsleeve');
  $longsleeveArtcile.append($longsleeveP, $shortsImg)

  //COAT
  var $coatArtcile = $('article').addClass('coat');
  var $coatImg = $('img').attr({'src': 'assets/noun_644778_cc.svg', 'alt': 'coat'});
  var $coatP  = $('p').text('coat');
  $coatArtcile.append($coatP, $shortsImg)

  //MITTS
  var $mittsArtcile = $('article').addClass('mitts');
  var $mittsImg = $('img').attr({'src': 'assets/noun_644778_cc.svg', 'alt': 'mitts'});
  var $mittsP  = $('p').text('mitts');
  $mittsArtcile.append($mittsP, $shortsImg)

  //TOQUE
  var $toqueArtcile = $('article').addClass('toque');
  var $toqueImg = $('img').attr({'src': 'assets/noun_644778_cc.svg', 'alt': 'toque'});
  var $toqueP  = $('p').text('toque');
  $toqueArtcile.append($toqueP, $shortsImg)



  if (clothing.feelslike_c > 35) {

    $('.clothing').hide();
    $('.toohot').show();

  } else if (clothing.feelslike_c > 20) {

    $('.results').append($tanktopArtcile, $shortsArtcile)
  
  } else if (clothing.feelslike_c > 5) {
    
    $('.results').append($tshirtArtcile, $shortsArtcile)

  } else if (clothing.feelslike_c > 0) {

    $('.results').append($longsleeveArtcile, $pantsArtcile)

  } else if (clothing.feelslike_c > -5) {

    $('.results').append($longsleeveArtcile, $pantsArtcile, $mittsArtcile, $toqueArtcile)

  } else if (clothing.feelslike_c > -10) {

    $('.results').append($longsleeveArtcile, $coatArtcile, $pantsArtcile, $mittsArtcile, $toqueArtcile)

  } else {

    $('.clothing').hide();
    $('.toocold').show();

  }

}

//Runs all the stuffs
appRunning.init = function () {
  appRunning.findLocation();
};

$(document).ready(function() {
  appRunning.init();
});