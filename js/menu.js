var menuState = {

  players: [],

  preload: function (){

  },

  create: function(){

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

    this.players.push(new Player()
                      .withTeam('teamA')
                      .withControls('default')
                      .withColor('0xe0e4f1')
                      .withSpawnPoint('spawnA')
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(1)
                      .addCharacter(1)
                      .addCharacter(2)
                      .addCharacter(2)
                      .addCharacter(2)
                      .addCharacter(2)
                      .addCharacter(1)
                      .addCharacter(1)
                      .addCharacter(3)
                      .addCharacter(3)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
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
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(1)
                      .addCharacter(1)
                      .addCharacter(2)
                      .addCharacter(2)
                      .addCharacter(2)
                      .addCharacter(2)
                      .addCharacter(1)
                      .addCharacter(1)
                      .addCharacter(3)
                      .addCharacter(3)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .build());

    game.state.start('table');
  }

};
