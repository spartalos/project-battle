var Player = function(){

  this.team = null;
  this.color = '0x2A4F6E';
  this.spawnPoint = null;

  this.marker = {
    markerRect: null,
    drawMarker: function(){
      this.markerRect = game.add.graphics();
      this.markerRect.lineStyle(2, 0xFFD50D, 1);
      this.markerRect.drawRect(0, 0, 32, 32);
      this.markerRect.x = 256;
      this.markerRect.y = 256;
      this.markerRect.visible = false;
    },
    toggleMarker: function(){
      this.markerRect.visible = !this.markerRect.visible;
    },
    moveMarker: function(floorLayer, moveX, moveY){
      this.markerRect.x = (floorLayer.getTileX(this.markerRect.x) + moveX) * 32;
      this.markerRect.y = (floorLayer.getTileY(this.markerRect.y) + moveY) * 32;
      tableState.createLabels();
      if (tableState.activeCharacter != null) {
        tableState.activeCharacter.move(this.markerRect.x, this.markerRect.y);
      }
    }
  };

  this.controls = {
    upKey: null, downKey: null, leftKey: null, rightKey: null, actionKey: null,
    initKeyboard: function(upKey, downKey, leftKey, rightKey, actionKey){
      this.upKey = game.input.keyboard.addKey(upKey != null ? upKey : Phaser.Keyboard.W);
      this.downKey = game.input.keyboard.addKey(downKey != null ? downKey : Phaser.Keyboard.S);
      this.leftKey = game.input.keyboard.addKey(leftKey != null ? leftKey : Phaser.Keyboard.A);
      this.rightKey = game.input.keyboard.addKey(rightKey != null ? rightKey : Phaser.Keyboard.D);
      this.actionKey = game.input.keyboard.addKey(actionKey != null ? actionKey : Phaser.Keyboard.SPACEBAR);
    }
  };

  this.characterDeck = [];

  this.isActive = false;

  this.withMarker = function(){
    this.marker.initMarker();
    return this;
  };

  this.withControls = function(type, upKey, downKey, leftKey, rightKey, actionKey){
    if(type == 'keyboard'){
      this.controls.initKeyboard(upKey, downKey, leftKey, rightKey, actionKey);
    }
    return this;
  };

  this.withColor = function(color){
    this.color = color;
    return this;
  };

  this.withSpawnPoint = function(spawnPoint){
    this.spawnPoint = spawnPoint;
    return this;
  };

  this.withTeam = function(team){
    this.team = team;
    return this;
  }

  this.addCharacter = function(id){
    this.characterDeck.push(new Character().initFromJSON(id).addToTeam(this.team).addToPlayer(this));
    return this;
  };

  this.build = function(){
    return this;
  };

  return this;
};
