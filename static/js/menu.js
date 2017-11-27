var menuState = {

  players: [],
  startOnlineGameLabel: null,

  preload: function (){

  },

  create: function(){

    var titleLabel = new Label(0, -200, 'Project Battle', '50px', 'bold', true).build();
    var subTitleLabel = new Label(0, -150, 'Alpha build', '20px', 'bold', true).build();

    var startGameLabel = new Label(0, 0, 'Start Local Game', '50px', 'bold', false)
                        .OnInputDown(this.startGameListener)
                        .withContext(this).build();

    this.startOnlineGameLabel = new Label(0, 100, 'Connect to Online Game', '50px', 'bold', false)
                              .OnInputDown(this.startOnlineGameListener)
                              .withContext(this).build();

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

    this.startOnlineGameLabel.setText('Waiting for other players to join...');
    this.startOnlineGameLabel.disableAllEvents();
        
    this.waitForStartSignalFromServer();

  },

  waitForStartSignalFromServer: function(){
    socket.on('start', function(players){
      console.log('start signal arrived');
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
