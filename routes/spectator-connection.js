module.exports = function(req, res, io)
{
  io.sockets.on('connection', function(socket)
  {
    setInterval(function()
    {
      socket.emit('sendDraw', {drawing:'drawing'});
    }, 20);
  });
}