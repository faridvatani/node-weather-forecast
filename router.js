var render = require('./render');
var querystring = require('querystring');
var weather = require('./weather');


function Home(request , response) {
    if (request.url == '/'){
        //show details if get OR post
        if(request.method.toLocaleLowerCase() === "get"){
            response.writeHead(200 , {'Content-Type' : 'text/html'});
            // response.write('route home');

            //yek module kohdamoon navshtim ke 3ta section dara
            //dar parameter aval "Home/Header" dar in view miyad yek file or yek template ro show konim
            //dar parameter two {} agar bekhahim value roo show konim
            //dar parameter three response ta etela roo az view begiraim va dakele response ono write konim
            render.view("location", {"title" : "Weather Forecast"} , response);
            response.end();
        }else {
            //if POST
            // get data from inputtext
            // localhost:3000/gorgan
            request.on('data' , function (PostBody) {
                // console.log(PostBody.toString());
                var query = querystring.parse(PostBody.toString());
                response.writeHead(302 , {"Location" : "/" + query.location});
                response.end();
            });

        }
    }



}

function Forcast(request , response) {
    //get location
    var location = request.url.replace("/" , "");
    // console.log(location);

    if (location.length > 0){
        //episode 7
        // response.writeHead(200 , {'Content-Type' : 'text/plain'});
        // response.write('route Forcast');
        // response.end();
        //episode 8
        weather.getlocation(location , function (lat,lng) {
            // console.log(lat,lng);
            weather.getweather(lat,lng, function (data) {
                var weath = data.daily.data;
                response.writeHead(200 , {'Content-Type' : 'text/html'});
                render.view('header' , { title: location} , response);
                weath.forEach(function (item , index) {
                    render.view('weather' , {
                        time: item.time,
                        icon: item.icon,
                        tempMax: Math.round(item.temperatureMax),
                        tempMin: Math.round(item.temperatureMin)
                    }, response);
                });
                render.view('footer' , {} , response);
                response.end();
            }, error);
        }, error);
    }
}

function error(err) {
    if(err) console.log(err);
}
//baray fahmandan functionha masalan Home az method module.exports ,.... estefadeh mikoim.
module.exports.home = Home;
module.exports.forcast = Forcast;