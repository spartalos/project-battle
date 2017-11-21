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
                                      'Start Local Game',
                                      {font: 'bold 50px Arial', fill: '#ffffff',
                                      boundsAlignH: "center", boundsAlignV: "middle" });

    startGameLabel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    startGameLabel.setTextBounds(0, 0, game.world.width, game.world.height);

    var startOnlineGameLabel = game.add.text(0, 0,
      'Connect to Online Game',
      {font: 'bold 50px Arial', fill: '#ffffff',
      boundsAlignH: "center", boundsAlignV: "middle" });

    startOnlineGameLabel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    startOnlineGameLabel.setTextBounds(0, 200, game.world.width, game.world.height);
    startOnlineGameLabel.inputEnabled = true;
    startOnlineGameLabel.events.onInputDown.add(this.startOnlineGameListener, this);
    startOnlineGameLabel.events.onInputOver.add(this.starGameOverListener, this);
    startOnlineGameLabel.events.onInputOut.add(this.starGameOutListener, this);

    startGameLabel.inputEnabled = true;
    startGameLabel.events.onInputDown.add(this.startGameListener, this);
    startGameLabel.events.onInputOver.add(this.starGameOverListener, this);
    startGameLabel.events.onInputOut.add(this.starGameOutListener, this);

  },

  startOnlineGameListener: function(){
    this.reinitPlayers();
    
    //These will come from the menu.
    var characterIds = [3, 1, 4, 0, 5, 0, 2, 0, 6, 0, 7, 0, 8, 0, 9, 1];
    var name = 'Spartalos'
    var team = 'teamA';
    var controls = 'default';
    var color = '0xe0e4f1';
    var infoPosition = 25;
    socket.emit('newplayer', {name: name, team: team, controls: controls, color: color, infoPosition: 25, characters: characterIds});
        
    this.waitForStartSignalFromServer();

  },

  waitForStartSignalFromServer: function(){
    socket.on('start', function(players){

      players.forEach( function(player){
        menuState.players.push(new Player()
                            .withName(player.name)
                            .withTeam(player.team)
                            .withControls(player.controls)
                            .withColor(player.color)
                            .withInfoPositionX(player.infoPosition)
                            .addCharacters(player.characters)
                            .build());
      });

      game.state.start('table');
    });
  },

  starGameOverListener: function(item){
    item.fill = "#ffff44";
  },

  starGameOutListener: function(item){
    item.fill = "#ffffff";
  },

  startGameListener: function(){

    this.reinitPlayers();

    //These will come from the menu.
    var characterIds = [3, 1, 4, 0, 5, 0, 2, 0, 6, 0, 7, 0, 8, 0, 9, 1];
    var name = 'Spartalos'
    var team = 'teamA';
    var controls = 'default';
    var color = '0xe0e4f1';
    var infoPosition = 25;

    this.players.push(new Player()
                    .withName(name)
                    .withTeam(team)
                    .withControls(controls)
                    .withColor(color)
                    .withInfoPositionX(25)
                    .addCharacters(characterIds)
                    .build());

    this.players.push(new Player()
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
                      .build());

    game.state.start('table');
  },

  reinitPlayers: function(){
    if(this.players.length > 0){
      this.players = [];
    }
  }

};
