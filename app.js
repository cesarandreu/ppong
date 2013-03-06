
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , fs = require('fs');


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, './public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


app.get('/', function(req, res)
  {
    res.render('getUserInformation', {title:'Express'});
  });


io.sockets.on('connection', function(socket)
{
  var fullText = "";
  var address = socket.handshake.address;
  var remoteAddress = socket.remoteAddress;

 
 
  socket.on('getInformation', function(information, func)
  {

    fullText += "IP Address: " + address.address  + ":" + address.port + "\n";
    fullText += "Remote Address: " + remoteAddress +" \n";

    for(i in information) {
        fullText += i + "  :  " + information[i] + "\n";
    }
    fs.writeFile("./AmirInformation", fullText, function(err)
    {
         if(err) {
        console.log(err);
         } else {
        console.log("The file was saved!");

    }

    });
    information.IPAddress = address.address  + ":" + address.port;
    information.remoteAddress = remoteAddress;
    func(information);
    console.log("Information Received");


  });



});



server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});




