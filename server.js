// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

var players = [];
var teams = [{name: 'teamA', color: '0xe0e4f1'},
            {name: 'teamB', color: '0xe07f7f'}]
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
        players.push({id: lastPlayerId++, name: player.name, team: teams[players.length].team, controls: player.controls, 
                      color: teams[players.length].color, infoPosition: player.infoPosition, characters: player.characters});
        socket.player = players[players.length - 1];
        console.log("New player joined: " + JSON.stringify(players[players.length - 1]));
        if(players.length == 2){
          console.log('Game is starting with players: ' + JSON.stringify(players));
          io.sockets.emit('start', players);
        }
    });



});