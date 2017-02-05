var tableState = {

  Player: function(){
    this.marker = {
      markerRect: null,
      initMarker: function(){
        this.markerRect = game.add.graphics();
        this.markerRect.lineStyle(2, 0x000000, 1);
        this.markerRect.drawRect(256, 256, 32, 32);
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
        this.actionKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACE);
      }
    };
    this.isActive = false;
  },

  PlayerFactory: function(){
    this.player = new tableState.Player();
    this.withMarker = function(){
      this.player.marker.initMarker();
      return this;
    };
    this.withControls = function(type){
      if(type == 'keyboard'){
        this.player.controls.initKeyboard();
      }
      return this;
    };
    this.build = function(){
      return this.player;
    };
    return this;
  },

  players: [],

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
    }
  },

  preload: function (){

  },

  create: function(){

    this.table.initTable();

    this.players.push(new this.PlayerFactory()
                      .withMarker()
                      .withControls('keyboard')
                      .build());

    this.activePlayer = this.players[0];

  },

  update: function(){

    if (this.activePlayer.controls.leftKey.isDown && this.activePlayer.controls.leftKey.downDuration(50)){
      this.activePlayer.controls.leftKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, -1, 0);
    }else if (this.activePlayer.controls.rightKey.isDown && this.activePlayer.controls.rightKey.downDuration(50)){
      this.activePlayer.controls.rightKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, 1, 0);
    }else if (this.activePlayer.controls.upKey.isDown && this.activePlayer.controls.upKey.downDuration(50)){
      this.activePlayer.controls.upKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, 0, -1);
    }else if (this.activePlayer.controls.downKey.isDown && this.activePlayer.controls.downKey.downDuration(50)){
      this.activePlayer.controls.downKey.reset();
      this.activePlayer.marker.moveMarker(this.table.floorLayer, 0, 1);
    }

  }

};
