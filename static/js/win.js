var winState = {

  winner: null,

  preload: function (){

  },

  create: function(){
    var endGameLabel = game.add.text(0, 0,
                                      this.winner + ' won the match. \n Click to Continue.',
                                      {font: 'bold 50px Arial', fill: '#ffffff',
                                      boundsAlignH: "center", boundsAlignV: "middle" });

    endGameLabel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    endGameLabel.setTextBounds(0, 0, game.world.width, game.world.height);

    endGameLabel.inputEnabled = true;
    endGameLabel.events.onInputDown.add(this.endGameListener, this);
  },

  update: function(){

  },

  endGameListener: function(){
    game.state.start('menu');
  }

};
