var tableState = {

  activePlayer: null,
  activePlayerId: 0,

  table: {
    tilemap: null,
    floorLayer: null,
    itemLayer: null,
    characterGroup: null,
    objects: null,

    initTable: function(){
      this.tilemap = game.add.tilemap('tableTileMap');
      this.tilemap.addTilesetImage('jeroomtileset', 'tilesheetImage');

      this.floorLayer = this.tilemap.createLayer('FloorLayer');
      this.itemLayer = this.tilemap.createLayer('ItemLayer');

      this.objects = this.tilemap.objects['ObjectLayer'];

      this.characterGroup = game.add.group();
    },

    spawnCharacters: function(spawnId, characterDeck, color){
      var spawnAreaObject = null;

      for(i = 0; i < this.objects.length; i++){
        if(this.objects[i].type == spawnId){
          spawnAreaObject = this.objects[i];
          break;
        }
      }

      var widthInTiles = spawnAreaObject.width / 32;
      var heightInTiles = spawnAreaObject.height / 32;
      //var xInTiles = spawnAreaObject.x / 32;
      //var yInTiles = spawnAreaObject.y / 32;
      var charId = 0;

      for(i = 0; i < heightInTiles && charId < characterDeck.length; i++){
        for(j = 0; j < widthInTiles && charId < characterDeck.length; j++){
          //this.tilemap.putTile(characterDeck[charId].tileId, xInTiles + j, yInTiles + i, this.characterLayer);
          characterDeck[charId].sprite = game.add.sprite(
                                                    spawnAreaObject.x + (j * 32),
                                                    spawnAreaObject.y + (i * 32),
                                                    'spritesheetImage',
                                                    characterDeck[charId].tileId,
                                                    this.characterGroup);
          characterDeck[charId].sprite.tint = color;
          charId++;
        }
      }

    }

  },

  preload: function (){

  },

  create: function(){

    this.table.initTable();

    for(k = 0; k < menuState.players.length; k++){
      this.table.spawnCharacters(menuState.players[k].spawnPoint,
                                  menuState.players[k].characterDeck,
                                  menuState.players[k].color);
      menuState.players[k].marker.drawMarker();
    }

    this.activePlayerId = menuState.players.length - 1;

    this.nextPlayer();

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
      this.nextPlayer();
    }

  },

  nextPlayer: function(){
    if(++this.activePlayerId % menuState.players.length == 0){
      this.activePlayerId = 0;
    }
    this.activePlayer = menuState.players[this.activePlayerId];
    this.activePlayer.marker.toggleMarker();
  },

  moveCharacter: function(){
    
  }

};
