if ("geolocation" in navigator) { //If geolocation is available, ask browser
    function success1(position) { // If geolocation is accepted, the func will return data
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    loadWeather(latitude+','+longitude);
}

  function error1() { //If Geolocation request is denied the func will do this
    errorText = "Enter Your Location in Search Bar"
     $(".location").text(errorText);

  }
    navigator.geolocation.getCurrentPosition(success1,error1); /* function that gets position, and if 
    geolocation was allowed with return what success1 gave it else, it will use what error1 gave it*/
} else{
    loadWeather("Plattsburgh,US",""); //If geolocation is not supported it will do this
}

$(document).ready(function(){ 
    setInterval(getWeather,10000);
});

function codeAddress() { /*Using Google maps API, gets lat and long and will load those in the loadWeather 
    func, the lat and long are returned by entering a location in serach bar and hitting enter */
    var address = document.getElementById("address").value;
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': address}, function(results, status) {
        var location = results[0].geometry.location;
        //alert('LAT: ' + location.lat() + ' LANG: ' + location.lng()*-1);
        loadWeather(location.lat()+','+location.lng())
    });
    }
    google.maps.event.addDomListener(window, 'load', codeAddress);

tempStore = 0 //var needed for func below to work 
countryStore = "" //var needed for func below to work 
function ChangeTemp(){ //Func that allows click on /f or /c to work, converts temp
    var elem = document.getElementById("convert");
    if(elem.value == "/ C"){
        temperature = Math.round((tempStore -32)*(5/9))+ '&deg;' + 'C';
        //temperature = 100 + '&deg;' + 'C'; //110 degree test
        $(".temperature").html(temperature);
        elem.value = "/ F";
    }
    else{
        temperature =  tempStore+ '&deg;' + 'F';
        $(".temperature").html(temperature);
        elem.value = "/ C";
    }
}
function loadWeather(location, woeid){ // Main weather loading func 
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'F',
        success: function(weather){ //if it was able to get the simpleWeather API then...
            var elem = document.getElementById("convert");
            tempStore = weather.temp;
            countryStore = weather.country // Checks to see if the country entered uses F
            if (weather.country == "United States" || weather.country == 'The Bahamas' || 
                weather.country == "Belize" || weather.country == "Cayman Islands" || 
                weather.country == "Palau" || weather.country == "Puerto Rico" ||
                weather.country == "Guam" || weather.country == "US Virgin Islands"){
                elem.value = "/ C";
                temp = weather.temp + '&deg;' + 'F';  
            }
            else{
                elem.value = "/ F";
                temp = Math.round((weather.temp -32)*(5/9))+ '&deg;' + 'C';
            }
            last_update = 'Last Updated: ' + weather.updated
            region_city =weather.city+","+weather.region
            wcode = '<img class="weathericon" src="images/weathericons/'+weather.code+'.svg">';
            wind = '<p>'+weather.wind.speed+'</p><p>'+weather.units.speed+'</p>';
            humidity = weather.humidity+' %';
            $(".location").text(region_city);
            $(".temperature").html(temp);
            $(".climate_bg").html(wcode);
            $(".windspeed").html(wind);
            $(".humidity").text(humidity);
            $(".updated").text(last_update);
        },
        error: function(error){
            $(".error").html('<p>'+error+'</p>');
        }
        
    });
}
