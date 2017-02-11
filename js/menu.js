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
                      .withControls('keyboard')
                      .withColor('0x486F82')
                      .withSpawnPoint('spawnA')
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(1)
                      .addCharacter(1)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(1)
                      .addCharacter(1)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .build());

    this.players.push(new Player()
                      .withControls('keyboard', Phaser.Keyboard.I,
                                                Phaser.Keyboard.K,
                                                Phaser.Keyboard.J,
                                                Phaser.Keyboard.L,
                                                Phaser.Keyboard.P)
                      .withColor('0xA44146')
                      .withSpawnPoint('spawnB')
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(1)
                      .addCharacter(1)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(1)
                      .addCharacter(1)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .addCharacter(0)
                      .build());

    game.state.start('load');
  }

};
