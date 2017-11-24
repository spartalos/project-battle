// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

var players = [];
var lastPlayerId = 0;

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));
app.use('/static/phaser/phaser.min.js', express.static(__dirname + '/node_modules/phaser-ce/build/phaser.min.js'));
app.use('/static/phaser/phaser-fps.js', express.static(__dirname + '/node_modules/phaser-plugin-advanced-timing/index.js'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

io.on('connection', function(socket) {

    socket.on('newplayer', function(player){
        players.push({id: lastPlayerId++, name: player.name, team: player.team, controls: player.controls, 
                      color: player.color, infoPosition: player.infoPosition, characters: player.characters});
        console.log("New player joined: " + JSON.stringify(players[players.length - 1]));
        if(players.length == 2){
          console.log('Game is starting with players: ' + JSON.stringify(players));
          socket.emit('start', players);
        }
    });

});