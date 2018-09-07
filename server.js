/**** weather forecast ****/
// in this project we use http://www.mapquestapi.com api for location & http://www.forcast.io(darksky.net) api for forcast
//i used roocket.ir node.js tutorial 
var http = require('http');
var router = require('./router');
http.createServer(function (request , response) {
    //localhost:3000
    router.home(request , response);
    //localhost:3000/gorgan
    router.forcast(request , response);

}).listen(3000 , function () {
    console.log('server running at localhost:3000');
});














