var loadState = {

  rescale: function(hScale, vScale){
    game.scale.setResizeCallback(function(){
      game.scale.setUserScale(hScale, vScale);
    }, game);

    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
  },

  fullscreen: function(){
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.game.scale.refresh();
  },

  preload: function(){

    game.stage.backgroundColor = '#2d2d2d';

    //Load table
    game.load.tilemap('tableTileMap', './assets/json/table.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tilesheetImage', './assets/images/fulltilesheet.png');

    //Load arena
    game.load.tilemap('arenaTileMap', './assets/json/arena.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.spritesheet('spritesheetImage', './assets/images/fulltilesheet.png', 32, 32);

  },

  create: function(){
    //this.rescale(1.1,1.1);
    this.fullscreen();
    game.state.start('menu');
  },

  update: function(){

  }

};
