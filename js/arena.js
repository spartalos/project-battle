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

    this.collisionDetectionBetweenFloorCharacters();
    this.collisionDetectionBetweenBulletsFloor();
    this.collisionDetectionBetweenBulletsCharacters();

    this.attackingCharacter.moveOnArena();
    this.defendingCharacter.moveOnArena();

  },

  collisionDetectionBetweenFloorCharacters: function(){
      game.physics.arcade.collide(this.attackingCharacter.sprite, this.arena.floorLayer);
      game.physics.arcade.collide(this.defendingCharacter.sprite, this.arena.floorLayer);
  },

  collisionDetectionBetweenBulletsFloor: function(){
    game.physics.arcade.collide(this.attackingCharacter.weapon.bullets, this.arena.floorLayer, function(bullet, floor){
      bullet.kill();
    });

    game.physics.arcade.collide(this.defendingCharacter.weapon.bullets, this.arena.floorLayer, function(bullet, floor){
      bullet.kill();
    });
  },

  collisionDetectionBetweenBulletsCharacters: function(){
    game.physics.arcade.collide(this.attackingCharacter.weapon.bullets,
                                this.defendingCharacter.sprite,
      function(sprite, bullet){
        bullet.kill();
        arenaState.defendingCharacter.health -= arenaState.attackingCharacter.damage;
        if(arenaState.defendingCharacter.health < 0){
          arenaState.attackingCharacter.positionX = arenaState.defendingCharacter.positionX;
          arenaState.attackingCharacter.positionY = arenaState.defendingCharacter.positionY;
          tableState.nextPlayer();
          game.state.start('table');
        }
      }
    );

    game.physics.arcade.collide(this.defendingCharacter.weapon.bullets,
                                this.attackingCharacter.sprite,
      function(sprite, bullet){
        bullet.kill();
        arenaState.attackingCharacter.health -= arenaState.defendingCharacter.damage;
        if(arenaState.attackingCharacter.health < 0){
          tableState.nextPlayer();
          game.state.start('table');
        }
      }
    );
  }

};
