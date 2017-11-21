var tableState = {

  activePlayer: null,
  activeCharacter: null,
  defendingCharacter: null,
  activePlayerId: 1,
  nameLabel: null,
  healthLabel: null,
  speedLabel: null,
  infoQueue: [],

  table: {

    tilemap: null,
    backgroundLayer: null,
    floorLayer: null,
    itemLayer: null,
    characterGroup: null,
    objects: null,
    objectives: [],

    initTable: function() {
      this.tilemap = game.add.tilemap('tableTileMap');
      this.tilemap.addTilesetImage('jeroomtileset', 'tilesheetImage');
      this.backgroundLayer = this.tilemap.createLayer('BackgroundLayer');
      this.floorLayer = this.tilemap.createLayer('FloorLayer');
      this.itemLayer = this.tilemap.createLayer('ItemLayer');
      this.objects = this.tilemap.objects['ObjectLayer'];
      if(this.objectives.length == 0) this.initObjectives();
      this.characterGroup = game.add.group();
    },

    initObjectives: function(){

      for (i = 0; i < this.objects.length; i++) {
        if (this.objects[i].type == 'objective') {
          this.objectives.push(this.objects[i]);
        }
      }
    },

    spawnCharacters: function(characterDeck, color) {

      var spawnAreaObject = null;

      for (i = 0; (spawnAreaObject == null && i < this.objects.length); i++) {
        if(this.objects[i].type.indexOf('spawn') !== -1){
          spawnAreaObject = this.objects[i];
          this.objects.splice(i, 1);
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
    this.controlMovement();
    this.showInfo();
  },

  controlMovement: function(){
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
      this.table.spawnCharacters(menuState.players[k].characterDeck);
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
    for(i = 0; i < menuState.players.length; i++){
      for (j = 0; j < menuState.players[i].characterDeck.length; j++) {
        if (this.activePlayer.marker.markerRect.x == menuState.players[i].characterDeck[j].sprite.x
          && this.activePlayer.marker.markerRect.y == menuState.players[i].characterDeck[j].sprite.y) {
          return menuState.players[i].characterDeck[j];
        }
      }
    }
  },

  findActiveCharacterInTile: function(){
    for (i = 0; i < this.activePlayer.characterDeck.length; i++) {
      if (this.activePlayer.marker.markerRect.x == this.activePlayer.characterDeck[i].sprite.x
        && this.activePlayer.marker.markerRect.y == this.activePlayer.characterDeck[i].sprite.y) {
        return this.activePlayer.characterDeck[i];
      }
    }
  },

  pickUpCharacter: function(){
    this.activeCharacter = this.findActiveCharacterInTile();
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

    var distanceX = this.activePlayer.marker.markerRect.x > this.activeCharacter.positionX ?
     (this.activePlayer.marker.markerRect.x - this.activeCharacter.positionX) / 32
     : (this.activeCharacter.positionX - this.activePlayer.marker.markerRect.x) / 32;

    var distanceY = this.activePlayer.marker.markerRect.y > this.activeCharacter.positionY ?
     (this.activePlayer.marker.markerRect.y - this.activeCharacter.positionY) / 32
     : (this.activeCharacter.positionY - this.activePlayer.marker.markerRect.y) / 32;

    var startTile = this.table.tilemap.getTile(this.activeCharacter.positionX / 32,
                                  this.activeCharacter.positionY / 32,
                                   this.table.floorLayer);

    var destinationTile = this.table.tilemap.getTile(this.activeCharacter.sprite.x / 32,
                                  this.activeCharacter.sprite.y / 32,
                                   this.table.floorLayer);

    if (this.activeCharacter.moveSpeed >= distanceX
        && this.activeCharacter.moveSpeed >= distanceY
        && destinationTile) {

      //check if there is a teammate or an enemy on the tile
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

      this.captureDestinationTile(startTile, destinationTile);
      return true;
    }else{
      this.pushInfo(this.activePlayer.cantGoThereMessage, this.activePlayer.infoLabelPositionX);      
      return false;      
    }

  },

  captureDestinationTile: function(startTile, destinationTile){

    for (i = 0; i < this.table.objectives.length; i++) {
      if (startTile.x * 32 == this.table.objectives[i].x
        && startTile.y * 32 == this.table.objectives[i].y) {
          this.activeCharacter.onObjective(false);
          this.pushInfo(this.activePlayer.looseObjectiveMessage, this.activePlayer.infoLabelPositionX);
        break;
      }
    }

    for (i = 0; i < this.table.objectives.length; i++) {
      if (destinationTile.x * 32 == this.table.objectives[i].x
        && destinationTile.y * 32 == this.table.objectives[i].y) {
          this.activeCharacter.onObjective(true);
          this.pushInfo(this.activePlayer.captureObjectiveMessage, this.activePlayer.infoLabelPositionX);
          if(this.activePlayer.capturedObjectives == this.table.objectives.length){
            winState.winner = this.activePlayer.team;
            this.table.characterGroup.destroy();            
            game.state.start('win');
          }
        break;
      }
    }
  },

  createLabels: function(){

      var characterOnTile = this.findCharacterInTile();

      this.destroyLabels();

      if(characterOnTile){

        this.healthLabel = game.add.text(characterOnTile.player.infoLabelPositionX,
                                          game.world.height - game.world.height / 1.2,
                                          'Health: ' + characterOnTile.health,
                                          {font: '24px Arial', fill: '#ffffff'});
        this.nameLabel = game.add.text(characterOnTile.player.infoLabelPositionX,
                                          game.world.height - ((game.world.height / 1.2) + 24),
                                          'Name: ' + characterOnTile.name,
                                          {font: '24px Arial', fill: '#ffffff'});
        this.speedLabel = game.add.text(characterOnTile.player.infoLabelPositionX,
                                          game.world.height - ((game.world.height / 1.2) - 24),
                                          'Speed: ' + characterOnTile.moveSpeed,
                                          {font: '24px Arial', fill: '#ffffff'});
      }

  },

  createInfoLabel: function(info){

    var infoLabel = game.add.text(info.position,
                                      game.world.height - ((game.world.height / 1.2) - 72),
                                      info.message,
                                      {font: '24px Arial', fill: '#ffffff'});
    infoLabel.lifespan = 3000;
  },

  showInfo: function(){
    if(this.infoQueue.length > 0){
      this.createInfoLabel(this.infoQueue.shift());
    }
  },

  pushInfo: function(info, position){
    this.infoQueue.push({message: info, position: position});
  },

  destroyLabels: function(){
    if(this.healthLabel && this.nameLabel && this.speedLabel){
      this.healthLabel.destroy();
      this.nameLabel.destroy();
      this.speedLabel.destroy();
    }
  }

};
