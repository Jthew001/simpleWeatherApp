if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        loadWeather(position.coords.latitude+','+position.coords.longitude);
    });
} else{
    loadWeather("Plattsburgh,US","");
}

$(document).ready(function(){
    setInterval(getWeather,10000);
});

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



function loadWeather(location, woeid){
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'F',
        success: function(weather){
            city = weather.city;
            temp = weather.temp + '&deg;';
            wcode = '<img class="weathericon" src="images/weathericons/'+weather.code+'.svg">';
            wind = '<p>'+weather.wind.speed+'</p><p>'+weather.units.speed+'</p>';
            humidity = weather.humidity+' %';
            $(".location").text(city);
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
