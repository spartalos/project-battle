var menuState = {

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
    game.state.start('load');
  }

};
