var io = require('socket.io').listen(app);

module.exports = function(req, res)
{
  io.sockets.on('connection', function(socket)
  {
    setInterval(function()
    {
      socket.emit('sendDraw', {drawing:'drawing'});
    }, 20);
  });
}