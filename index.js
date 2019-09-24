var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
 app.use(express.static('public'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('user login', function(msg){
  	io.emit('user login', msg);
  });

  socket.on('private message', function(msg) {
  	io.emit('private message', msg);
  });

  socket.on('typing', function(msg) {
  	io.emit('typing', msg);
  });

  socket.on('logout', function(msg) {
  	io.emit('logout', msg);
  });

 

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
