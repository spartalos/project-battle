var arenaState = {

  attackingCharacter: null,
  defendingCharacter: null,

  arena: {
    tilemap: null,
    floorLayer: null,
    object: null,

    characterGroup: null,

    initArena: function() {
      this.tilemap = game.add.tilemap('arenaTileMap');
      this.tilemap.addTilesetImage('jeroomtileset', 'tilesheetImage');
      this.floorLayer = this.tilemap.createLayer('FloorLayer');
      this.objects = this.tilemap.objects['ObjectLayer'];
      this.tilemap.setCollision(131, true, this.floorLayer);
      this.characterGroup = game.add.group();
    },

    spawnCharacter: function(spawnId, character) {
      var spawnAreaObject = null;
      for (i = 0; i < this.objects.length; i++) {
        if (this.objects[i].type == spawnId) {
          spawnAreaObject = this.objects[i];
          break;
        }
      }


      character.sprite = game.add.sprite(spawnAreaObject.x,
                                                   spawnAreaObject.y,
                                                   'spritesheetImage',
                                                   character.tileId,
                                                   this.characterGroup);

       game.physics.arcade.enable(character.sprite);
       character.sprite.body.bounce.y = 0.2;
       character.sprite.body.gravity.y = 300;
       character.sprite.body.collideWorldBounds = true;

    }
  },

  preload: function(){

  },

  create: function(){

    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.attackingCharacter = tableState.activeCharacter;
    this.defendingCharacter = tableState.defendingCharacter;

    this.arena.initArena();
    this.arena.spawnCharacter('spawnA', this.attackingCharacter);
    this.arena.spawnCharacter('spawnB', this.defendingCharacter);

  },

  update: function(){

    game.physics.arcade.collide(this.attackingCharacter.sprite, this.arena.floorLayer);
    game.physics.arcade.collide(this.defendingCharacter.sprite, this.arena.floorLayer);

    if (tableState.activePlayer.controls.upKey.isDown) {
        this.attackingCharacter.sprite.body.velocity.y -= 10;
    }
    if (tableState.activePlayer.controls.leftKey.isDown) {
      this.attackingCharacter.sprite.body.velocity.x -= 1;
    } else if (tableState.activePlayer.controls.rightKey.isDown) {
      this.attackingCharacter.sprite.body.velocity.x += 1;
    }

  }

};
