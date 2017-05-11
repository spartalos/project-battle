var arenaState = {

  attacker: null,
  defender: null,

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

    this.attacker = new ArenaRole().initRole(tableState.activeCharacter, 10, 10);
    this.defender = new ArenaRole().initRole(tableState.defendingCharacter, game.world.width - 200, 10);

    this.arena.initArena();
    this.arena.spawnCharacter('spawnA', this.attacker.character);
    this.arena.spawnCharacter('spawnB', this.defender.character);

  },

  update: function(){

    this.collisionDetectionBetweenFloorCharacters();
    this.collisionDetectionBetweenBulletsFloor();
    this.collisionDetectionBetweenBulletsCharacters();

    this.attacker.character.moveOnArena();
    this.defender.character.moveOnArena();

  },

  animateHurt: function(role){
    var tween = game.add.tween(role.character.sprite).to(
        { tint: 0xFFD50D }, 100, Phaser.Easing.Linear.None, true);
        tween.yoyo(10, 100);
  },

  collisionDetectionBetweenFloorCharacters: function(){
      game.physics.arcade.collide(this.attacker.character.sprite, this.arena.floorLayer);
      game.physics.arcade.collide(this.defender.character.sprite, this.arena.floorLayer);
  },

  collisionDetectionBetweenBulletsFloor: function(){
    game.physics.arcade.collide(this.attacker.character.weapon.bullets, this.arena.floorLayer, function(bullet, floor){
      bullet.kill();
    });

    game.physics.arcade.collide(this.defender.character.weapon.bullets, this.arena.floorLayer, function(bullet, floor){
      bullet.kill();
    });
  },

  collisionDetectionBetweenBulletsCharacters: function(){
    game.physics.arcade.collide(this.attacker.character.weapon.bullets,
                                this.defender.character.sprite,
      function(sprite, bullet){
        bullet.kill();
        arenaState.defender.character.health -= arenaState.attacker.character.damage;
        arenaState.animateHurt(arenaState.defender);
        arenaState.defender.createLabel();
        if(arenaState.defender.character.health <= 0){
          arenaState.attacker.character.positionX = arenaState.defender.character.positionX;
          arenaState.attacker.character.positionY = arenaState.defender.character.positionY;
          arenaState.attacker.character.player.captureObjective();
          arenaState.defender.character.player.looseObjective();
          game.state.start('table');
        }
      }
    );

    game.physics.arcade.collide(this.defender.character.weapon.bullets,
                                this.attacker.character.sprite,
      function(sprite, bullet){
        bullet.kill();
        arenaState.attacker.character.health -= arenaState.defender.character.damage;
        arenaState.animateHurt(arenaState.attacker);
        arenaState.attacker.createLabel();
        if(arenaState.attacker.character.health <= 0){
          game.state.start('table');
        }
      }
    );

  }

};
