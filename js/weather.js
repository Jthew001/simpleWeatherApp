if ("geolocation" in navigator) {
    function success1(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    loadWeather(latitude+','+longitude);
}

  function error1() {
    errorText = "Enter Your Location in Search Bar"
     $(".location").text(errorText);

  }
    navigator.geolocation.getCurrentPosition(success1,error1);
} else{
    loadWeather("Plattsburgh,US","");
}

$(document).ready(function(){
    setInterval(getWeather,10000);
});

//global tempStore = 0

function codeAddress() {
    var address = document.getElementById("address").value;
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': address}, function(results, status) {
        var location = results[0].geometry.location;
        //alert('LAT: ' + location.lat() + ' LANG: ' + location.lng()*-1);
        loadWeather(location.lat()+','+location.lng())
    });
    }
    google.maps.event.addDomListener(window, 'load', codeAddress);

tempStore = 0
countryStore = ""
function ChangeTemp(){
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
function loadWeather(location, woeid){
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'F',
        success: function(weather){
            var elem = document.getElementById("convert");
            tempStore = weather.temp;
            countryStore = weather.country
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
            region_city =weather.city+","+weather.region
            
            wcode = '<img class="weathericon" src="images/weathericons/'+weather.code+'.svg">';
            wind = '<p>'+weather.wind.speed+'</p><p>'+weather.units.speed+'</p>';
            humidity = weather.humidity+' %';
            $(".location").text(region_city);
            $(".temperature").html(temp);
            $(".climate_bg").html(wcode);
            $(".windspeed").html(wind);
            $(".humidity").text(humidity);
        },
        error: function(error){
            $(".error").html('<p>'+error+'</p>');
        }
        
    });
}
