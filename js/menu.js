var menuState = {

  players: [],

  preload: function (){

  },

  create: function(){

    var startGameLabel = game.add.text(game.world.width - (game.world.width / 3) * 2,
                                      game.world.height - game.world.height / 2,
                                      'Start Game',
                                      {font: '50px Arial', fill: '#ffffff'});

    startGameLabel.inputEnabled = true;
    startGameLabel.events.onInputDown.add(this.startGameListener, this);

  },

  update: function(){

  },

  startGameListener: function(){

    this.players.push(new Player()
                      .withTeam('teamA')
                      .withControls('keyboard')
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
                      .withControls('keyboard', Phaser.Keyboard.I,
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
