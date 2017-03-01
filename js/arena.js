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
      this.floorLayer.resizeWorld();
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
     character.sprite.tint = character.player.color;
     character.sprite.anchor.setTo(.5, .5);
     character.sprite.body.bounce.y = 0;
     character.sprite.body.gravity.y = 300;
     character.sprite.body.collideWorldBounds = true;

     character.addWeapon();

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
    game.physics.arcade.collide(this.attackingCharacter.weapon.bullets, this.arena.floorLayer, function(bullet, floor){
      bullet.kill();
    });
    game.physics.arcade.collide(this.defendingCharacter.weapon.bullets, this.arena.floorLayer, function(bullet, floor){
      bullet.kill();
    });
    game.physics.arcade.collide(this.attackingCharacter.weapon.bullets, this.defendingCharacter.sprite, function(bullet, sprite, attackingCharacter, defendingCharacter){
      bullet.kill();
      defendingCharacter.health -= attackingCharacter.damage;
      console.log('defendingCharacter health: ' + defendingCharacter.health);
    });
    game.physics.arcade.collide(this.defendingCharacter.weapon.bullets, this.attackingCharacter.sprite, function(bullet, floor){
      bullet.kill();
      this.attackingCharacter.health -= this.defendingCharacter.damage;
      console.log('attackingCharacter health: ' + this.attackingCharacter.health);
    });

    this.attackingCharacter.moveOnArena();
    this.defendingCharacter.moveOnArena();

  }

};
