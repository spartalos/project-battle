var tableState = {

  activePlayer: null,
  activeCharacter: null,
  activePlayerId: 0,

  table: {

    tilemap: null,
    backgroundLayer: null,
    floorLayer: null,
    itemLayer: null,
    characterGroup: null,
    objects: null,

    initTable: function() {
      this.tilemap = game.add.tilemap('tableTileMap');
      this.tilemap.addTilesetImage('jeroomtileset', 'tilesheetImage');
      this.backgroundLayer = this.tilemap.createLayer('BackgroundLayer');
      this.floorLayer = this.tilemap.createLayer('FloorLayer');
      this.itemLayer = this.tilemap.createLayer('ItemLayer');
      this.objects = this.tilemap.objects['ObjectLayer'];
      this.characterGroup = game.add.group();
    },

    spawnCharacters: function(spawnId, characterDeck, color) {
      var spawnAreaObject = null;
      for (i = 0; i < this.objects.length; i++) {
        if (this.objects[i].type == spawnId) {
          spawnAreaObject = this.objects[i];
          break;
        }
      }
      var widthInTiles = spawnAreaObject.width / 32;
      var heightInTiles = spawnAreaObject.height / 32;
      var charId = 0;
      for (i = 0; i < heightInTiles && charId < characterDeck.length; i++) {
        for (j = 0; j < widthInTiles && charId < characterDeck.length; j++) {
          characterDeck[charId].sprite =
                                   game.add.sprite(spawnAreaObject.x + (j * 32),
                                                  spawnAreaObject.y + (i * 32),
                                                  'spritesheetImage',
                                                  characterDeck[charId].tileId,
                                                  this.characterGroup);
          characterDeck[charId].positionX = characterDeck[charId].sprite.x;
          characterDeck[charId].positionY = characterDeck[charId].sprite.y;
          characterDeck[charId].sprite.tint = color;
          charId++;
        }
      }
    }
  },

  preload: function() {},

  create: function() {
    this.table.initTable();
    for (k = 0; k < menuState.players.length; k++) {
      this.table.spawnCharacters(menuState.players[k].spawnPoint, menuState
        .players[k].characterDeck, menuState.players[k].color);
      menuState.players[k].marker.drawMarker();
    }
    this.activePlayer = menuState.players[this.activePlayerId];
    this.activePlayer.marker.toggleMarker();
  },

  update: function() {
    if (this.activePlayer.controls.leftKey.isDown && this.activePlayer.controls
      .leftKey.downDuration(50)) {
      this.activePlayer.controls.leftKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, -1, 0);
      this.moveCharacterWithMarker();
    } else if (this.activePlayer.controls.rightKey.isDown && this.activePlayer
      .controls.rightKey.downDuration(50)) {
      this.activePlayer.controls.rightKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, 1, 0);
      this.moveCharacterWithMarker();
    }
    if (this.activePlayer.controls.upKey.isDown && this.activePlayer.controls
      .upKey.downDuration(50)) {
      this.activePlayer.controls.upKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, 0, -1);
      this.moveCharacterWithMarker();
    } else if (this.activePlayer.controls.downKey.isDown && this.activePlayer
      .controls.downKey.downDuration(50)) {
      this.activePlayer.controls.downKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, 0, 1);
      this.moveCharacterWithMarker();
    }
    if (this.activePlayer.controls.actionKey.isDown && this.activePlayer.controls
      .actionKey.downDuration(1000)) {
      this.activePlayer.controls.actionKey.reset();
      this.placeCharacter();
      //this.nextPlayer();
    }
  },

  nextPlayer: function() {
    if (++this.activePlayerId % menuState.players.length == 0) {
      this.activePlayerId = 0;
    }
    this.activePlayer.marker.toggleMarker();
    this.activePlayer = menuState.players[this.activePlayerId];
    this.activePlayer.marker.toggleMarker();
  },

  placeCharacter: function() {
    //Pick up a character
    if (this.activeCharacter == null) {

      for (i = 0; i < this.activePlayer.characterDeck.length; i++) {
        if (this.activePlayer.marker.markerRect.x == this.activePlayer.characterDeck[i].sprite.x
           && this.activePlayer.marker.markerRect.y == this.activePlayer.characterDeck[i].sprite.y) {
          break;
        }
      }
      this.activeCharacter = this.activePlayer.characterDeck[i];

    } else { // Put down a character

        var nextMove = this.isLegalMove();

        if(nextMove){
          if(nextMove.cid != null){
            game.state.start('arena', false, false, this.activeCharacter, nextMove);
          }
          this.activeCharacter.positionX = this.activeCharacter.sprite.x;
          this.activeCharacter.positionY = this.activeCharacter.sprite.y;
          this.activeCharacter = null;
          this.nextPlayer();
      }

    }
  },

  isLegalMove: function(){

    for(i = 0; i < menuState.players.length; i++){
      for(j = 0; j < menuState.players[i].characterDeck.length; j++){
        var isTeamMate = menuState.players[i].characterDeck[j].isItTeamMate(this.activeCharacter);
        if(isTeamMate == true){
          return false;
        }else if(isTeamMate != null){
          return menuState.players[i].characterDeck[j];
        }
      }
    }

    var moveX = this.activePlayer.marker.markerRect.x > this.activeCharacter.positionX ?
     (this.activePlayer.marker.markerRect.x - this.activeCharacter.positionX) / 32
     : (this.activeCharacter.positionX- this.activePlayer.marker.markerRect.x) / 32;

    var moveY = this.activePlayer.marker.markerRect.y > this.activeCharacter.positionY ?
     (this.activePlayer.marker.markerRect.y - this.activeCharacter.positionY) / 32
     : (this.activeCharacter.positionY - this.activePlayer.marker.markerRect.y) / 32;

    if (this.activeCharacter.moveSpeed >= moveX
        && this.activeCharacter.moveSpeed >= moveY
        && this.table.tilemap.getTile(this.activeCharacter.sprite.x / 32,
                                      this.activeCharacter.sprite.y / 32,
                                       this.table.floorLayer)) {
      return true;
    }

    return false;

  },

  moveCharacterWithMarker: function() {
    if (this.activeCharacter != null) {
      this.activeCharacter.move(this.activePlayer.marker.markerRect.x, this.activePlayer.marker.markerRect.y);
    }
  }
};
