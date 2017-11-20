var menuState = {

  players: [],

  preload: function (){

  },

  create: function(){

    var titleLabel = game.add.text(0, 0,
                                      'The Summoning',
                                      {font: 'bold 70px Arial', fill: '#ffffff',
                                      boundsAlignH: "center", boundsAlignV: "middle" });

    titleLabel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    titleLabel.setTextBounds(0, -200, game.world.width, game.world.height);

    var startGameLabel = game.add.text(0, 0,
                                      'Start Game',
                                      {font: 'bold 50px Arial', fill: '#ffffff',
                                      boundsAlignH: "center", boundsAlignV: "middle" });

    startGameLabel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    startGameLabel.setTextBounds(0, 0, game.world.width, game.world.height);

    startGameLabel.inputEnabled = true;
    startGameLabel.events.onInputDown.add(this.startGameListener, this);
    startGameLabel.events.onInputOver.add(this.starGameOverListener, this);
    startGameLabel.events.onInputOut.add(this.starGameOutListener, this);

  },

  update: function(){

  },

  starGameOverListener: function(item){
    item.fill = "#ffff44";
  },

  starGameOutListener: function(item){
    item.fill = "#ffffff";
  },

  startGameListener: function(){

    this.reinitPlayers();

    var characterIds = [3, 1, 4, 0, 5, 0, 2, 0, 6, 0, 7, 0, 8, 0, 9, 1];

      var player = new Player()
                      .withName('Spartalos')
                      .withTeam('teamA')
                      .withControls('default')
                      .withColor('0xe0e4f1')
                      .withInfoPositionX(50)
                      .addCharacters(characterIds)
                      .build();

      this.players.push(player);

 /*   this.players.push(new Player()
                      .withTeam('teamB')
                      .withControls('default', Phaser.Keyboard.I,
                                                Phaser.Keyboard.K,
                                                Phaser.Keyboard.J,
                                                Phaser.Keyboard.L,
                                                Phaser.Keyboard.P)
                      .withColor('0xe07f7f')
                      .withSpawnPoint('spawnB')
                      .withInfoPositionX(game.world.width - 400)
                      .addCharacter(1)
                      .addCharacter(3)
                      .addCharacter(0)
                      .addCharacter(4)
                      .addCharacter(0)
                      .addCharacter(5)
                      .addCharacter(0)
                      .addCharacter(2)
                      .addCharacter(0)
                      .addCharacter(6)
                      .addCharacter(0)
                      .addCharacter(7)
                      .addCharacter(0)
                      .addCharacter(8)
                      .addCharacter(1)
                      .addCharacter(9)
                      .build());*/

    socket = io('http://localhost:5000');
    socket.emit('newplayer', {name: player.name, characters: characterIds});
    if(this.players.length > 2){                  
      game.state.start('table');
    }
  },

  reinitPlayers: function(){
    if(this.players.length > 0){
      this.players = [];
    }
  }

};
