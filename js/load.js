var loadState = {

  preload: function(){
    // Here we should load the assets for the match.
    // Basically there will be 3 type of assets:
    // Table terrain assets
    // Character assets
    // Misc assets

    game.stage.backgroundColor = '#2d2d2d';

    game.load.tilemap('tableTileMap', './assets/json/table.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tilesheetImage', './assets/images/fulltilesheet.png');

  },

  create: function(){
    game.state.start('table');
  },

  update: function(){

  }

};
