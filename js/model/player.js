var Player = function(){

  this.marker = {
    markerRect: null,
    drawMarker: function(){
      this.markerRect = game.add.graphics();
      this.markerRect.lineStyle(2, 0x000000, 1);
      this.markerRect.drawRect(256, 256, 32, 32);
    },
    toggleMarker: function(){
      this.markerRect.visible = !this.markerRect.visible;
    },
    moveMarker: function(floorLayer, moveX, moveY){
      this.markerRect.x = (floorLayer.getTileX(this.markerRect.x) + moveX) * 32;
      this.markerRect.y = (floorLayer.getTileY(this.markerRect.y) + moveY) * 32;
    }
  };

  this.controls = {
    upKey: null, downKey: null, leftKey: null, rightKey: null, actionKey: null,
    initKeyboard: function(){
      this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
      this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
      this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
      this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
      this.actionKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
  };

  this.characterDeck = [];

  this.isActive = false;

  this.withMarker = function(){
    this.marker.initMarker();
    return this;
  };

  this.withControls = function(type){
    if(type == 'keyboard'){
      this.controls.initKeyboard();
    }
    return this;
  };

  this.addCharacter = function(id){
    this.characterDeck.push(new Character().initFromJSON(id));
    return this;
  };

  this.build = function(){
    return this;
  };

  return this;
};
