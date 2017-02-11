var loadState = {

  preload: function(){

    game.stage.backgroundColor = '#2d2d2d';

    game.load.tilemap('tableTileMap', './assets/json/table.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tilesheetImage', './assets/images/fulltilesheet.png');
    game.load.spritesheet('spritesheetImage', './assets/images/fulltilesheet.png', 32, 32);

  },

  create: function(){
    game.state.start('table');
  },

  update: function(){

  }

};
