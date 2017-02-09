var tableState = {

  activePlayer: null,

  table: {
    tilemap: null,
    floorLayer: null,
    itemLayer: null,
    objectLayer: null,
    characterLayer: null,

    initTable: function(){
      this.tilemap = game.add.tilemap('tableTileMap');
      this.tilemap.addTilesetImage('jeroomtileset', 'tilesheetImage');

      this.floorLayer = this.tilemap.createLayer('FloorLayer');
      this.itemLayer = this.tilemap.createLayer('ItemLayer');
      this.characterLayer = this.tilemap.createLayer('CharacterLayer');
      //this.characterLayer.visible = false;
    }
  },

  preload: function (){

  },

  create: function(){

    this.table.initTable();


    this.table.tilemap.putTile(menuState.players[0].characterDeck[0].tileId, 3, 3, this.table.characterLayer);

    this.activePlayer = menuState.players[0];
    this.activePlayer.marker.drawMarker();

  },

  update: function(){

    if (this.activePlayer.controls.leftKey.isDown && this.activePlayer.controls.leftKey.downDuration(50)){
      this.activePlayer.controls.leftKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, -1, 0);
    }else if (this.activePlayer.controls.rightKey.isDown && this.activePlayer.controls.rightKey.downDuration(50)){
      this.activePlayer.controls.rightKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, 1, 0);
    }
    if (this.activePlayer.controls.upKey.isDown && this.activePlayer.controls.upKey.downDuration(50)){
      this.activePlayer.controls.upKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, 0, -1);
    }else if (this.activePlayer.controls.downKey.isDown && this.activePlayer.controls.downKey.downDuration(50)){
      this.activePlayer.controls.downKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, 0, 1);
    }

    if(this.activePlayer.controls.actionKey.isDown && this.activePlayer.controls.actionKey.downDuration(1000)){
      this.activePlayer.controls.actionKey.reset();
      this.activePlayer.marker.toggleMarker();
    }

  }

};
