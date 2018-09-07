var http = require('http');
var https = require('https');
function getLocation(location , callback , error) {
    http.get('http://www.mapquestapi.com/geocoding/v1/address?key=z3DG71CNcCWTPOaXCg7J4cs7VxpYNiwH&location='+ location +'' , function (res) {

        var body = '';
        res.on('data' , function (data) {
           // console.log(JSON.parse(data.toString()));
            body += data;
        });
        res.on( 'end' , function () {
            var geocode = JSON.parse(body);

                for(var key in geocode){
                        var lat = geocode.results[0].locations[0].latLng.lat;
                        var lng = geocode.results[0].locations[0].latLng.lng;
                        var area = geocode.results[0].locations[0].adminArea5;
                        // console.log(lat,lng,area);
                        callback(lat,lng);
                        break;

                }

        });

        res.on('error' , function (err) {
               error(err);
        });

   });
}

function getWeather(lat , lng , success , error) {
    https.get('https://api.darksky.net/forecast/82ae76cc082d15e18dd8db2c6b71bd59/'+ lat +','+ lng +'?units=si' , function (res) {
        var body = '';
        res.on('data' , function (data) {
            // console.log(data.toString());
            body += data;
        });
        res.on( 'end' , function () {
            var weather = JSON.parse(body);
            success(weather);
        });
        res.on('error' , function (err) {
            error(err);
        });
    });
}


module.exports.getlocation = getLocation;
module.exports.getweather = getWeather;