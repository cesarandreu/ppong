
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , app = express()
  , gameLogic = require('./gameLogic')
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);


//State values
var controlState_noKey = 0;
var controlState_upKey = 1;
var controlState_downKey = 2;

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


app.get('/', function(req, res)
  {
    res.render('index', {title:'Express'});
  });
app.get('/p1', function(req, res)
{
  res.render('movement', {title:'Movement'});
});
io.sockets.on('connection', function(socket)
{
  setInterval(function()
  {
    gameLogic.gameUpdate(0.017);
    socket.emit('sendDraw', {ballPositionX: 100, ballPositionY: 200, paddle1: 100, paddle2: 100, score1: 0, score2: 10});
  }, 17);

  socket.on('movementUp', function(data, func)
    {

      gameLogic.input( controlState_upKey, data.playerID);
    });
  socket.on('movementDown', function(data, func)
  {

    gameLogic.input( controlState_downKey, data.playerID);
  });  
  socket.on('releasedUp', function(data, func)
  {

    gameLogic.input( controlState_noKey, data.playerID);
  });
  socket.on('releasedDown', function(data, func)
  {

    gameLogic.input( controlState_noKey, data.playerID);
  });
});

// app.get('/p1', require('./routes/p1-connection'));
// app.get('/p2', require('./routes/p2-connection'));

app.get('/gameview', function(req, res, io) {
  res.render('gameview');
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});




