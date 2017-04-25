var tableState = {

  activePlayer: null,
  activeCharacter: null,
  defendingCharacter: null,
  activePlayerId: 1,
  nameLabel: null,
  healthLabel: null,

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
          this.addCharacterSpriteToTable(characterDeck[charId], spawnAreaObject, i, j);
          charId++;
        }
      }
    },

    addCharacterSpriteToTable : function(character, spawnAreaObject, i, j){
      if(character.health > 0){
        character.sprite = game.add.sprite(character.positionX ? character.positionX : spawnAreaObject.x + (j * 32),
                                                character.positionY ? character.positionY : spawnAreaObject.y + (i * 32),
                                                'spritesheetImage',
                                                character.tileId,
                                                this.characterGroup);
        if(!character.positionX && !character.positionY){
          character.positionX = character.sprite.x;
          character.positionY = character.sprite.y;
        }
        character.sprite.tint = character.player.color;
      }
    }

  },

  preload: function() {},

  create: function() {
    this.table.initTable();
    this.initPlayersCharacters();
    this.nextPlayer();
    },

  update: function() {
    if (this.activePlayer.controls.leftKey.isDown && this.activePlayer.controls
      .leftKey.downDuration(50)) {
      this.activePlayer.controls.leftKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, -1, 0);
    } else if (this.activePlayer.controls.rightKey.isDown && this.activePlayer
      .controls.rightKey.downDuration(50)) {
      this.activePlayer.controls.rightKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, 1, 0);
    }
    if (this.activePlayer.controls.upKey.isDown && this.activePlayer.controls
      .upKey.downDuration(50)) {
      this.activePlayer.controls.upKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, 0, -1);
    } else if (this.activePlayer.controls.downKey.isDown && this.activePlayer
      .controls.downKey.downDuration(50)) {
      this.activePlayer.controls.downKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, 0, 1);
    }
    if (this.activePlayer.controls.actionKey.isDown && this.activePlayer.controls
      .actionKey.downDuration(1000)) {
      this.activePlayer.controls.actionKey.reset();
      this.placeCharacter();
    }
  },

  initPlayersCharacters: function(){
    for (k = 0; k < menuState.players.length; k++) {
      this.table.spawnCharacters(menuState.players[k].spawnPoint, menuState
        .players[k].characterDeck);
      menuState.players[k].marker.drawMarker();
    }
  },

  nextPlayer: function() {

      this.activePlayerId = ++this.activePlayerId % menuState.players.length;

      if(this.activePlayer){
        if(this.activePlayer.marker.markerRect.visible){
          this.activePlayer.marker.toggleMarker();
        }
      }

      this.activePlayer = menuState.players[this.activePlayerId];
      this.activePlayer.marker.toggleMarker();

      this.activeCharacter = null;

      game.stage.backgroundColor = this.activePlayer.color;

  },

  placeCharacter: function() {
    //Pick up a character
    if (this.activeCharacter == null) {
      this.pickUpCharacter();
    } else { // Put down a character
      this.putDownCharacter();
    }
  },

  findCharacterInTile: function(){
    for (i = 0; i < this.activePlayer.characterDeck.length; i++) {
      if (this.activePlayer.marker.markerRect.x == this.activePlayer.characterDeck[i].sprite.x
         && this.activePlayer.marker.markerRect.y == this.activePlayer.characterDeck[i].sprite.y) {
        return this.activePlayer.characterDeck[i];
      }
    }
  },

  pickUpCharacter: function(){
    this.activeCharacter = this.findCharacterInTile();
  },

  putDownCharacter: function(){
    var movementObject = this.isLegalMove();

    if(movementObject){
      if(movementObject.cid != null){
        this.defendingCharacter = movementObject;
        game.state.start('arena');
      }else{
        this.activeCharacter.positionX = this.activeCharacter.sprite.x;
        this.activeCharacter.positionY = this.activeCharacter.sprite.y;
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

  createLabels: function(){

      var characterOnTile = this.findCharacterInTile();

      if(this.healthLabel && this.nameLabel && !this.activeCharacter){
        this.healthLabel.destroy();
        this.nameLabel.destroy();
      }

      if(characterOnTile){

        this.healthLabel = game.add.text((game.world.width / 3) * 2,
                                          game.world.height - game.world.height / 1.5,
                                          'Health: ' + characterOnTile.health,
                                          {font: '20px Arial', fill: '#ffffff'});
        this.nameLabel = game.add.text((game.world.width / 3) * 2,
                                          game.world.height - ((game.world.height / 1.5) + 20),
                                          'Name: ' + characterOnTile.name,
                                          {font: '20px Arial', fill: '#ffffff'});
      }

  }

};
