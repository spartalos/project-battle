var characterCounter = 0;

var Character = function() {

  this.cid = null;
  this.id = null;
  this.name = null;
  this.health = null;
  this.damage = null;
  this.type = null;
  this.tileId = null;
  this.sprite = null;
  this.weapon = null;
  this.weaponTileId = null;
  this.moveSpeed = null;
  this.positionX = null;
  this.positionY = null;
  this.team = null;
  this.player = null;

  this.initFromJSON = function(id) {
    var character = JSON.parse(characters)[id];
    this.cid = characterCounter++;
    this.id = character.id;
    this.name = character.name;
    this.health = character.health;
    this.damage = character.damage;
    this.moveSpeed = character.moveSpeed;
    this.type = character.type;
    this.tileId = character.tileId;
    this.weaponTileId = character.weaponTileId;
    return this;
  };

  this.addToTeam = function(team){
    this.team = team;
    return this;
  };

  this.isItTeamMate = function(otherCharacter){
    if(this.cid != otherCharacter.cid
        && this.sprite.x == otherCharacter.sprite.x
        && this.sprite.y == otherCharacter.sprite.y
        && this.team == otherCharacter.team){
      return true;
    }else if(this.cid != otherCharacter.cid
        && this.sprite.x == otherCharacter.sprite.x
        && this.sprite.y == otherCharacter.sprite.y
        && this.team != otherCharacter.team){
      return false;
    }
    return null;
  };

  this.addToPlayer = function(player){
    this.player = player;
    return this;
  };

  this.addWeapon = function(){
    this.weapon = game.add.weapon(10, 'spritesheetImage', this.weaponTileId);
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.fireRate = 300;
    this.weapon.bulletSpeed = 100;
    this.weapon.trackSprite(this.sprite, 0, 0, true);
    return this;
  };

  this.move = function(x, y) {
      this.sprite.x = x;
      this.sprite.y = y;
  };

  this.moveOnArena = function(){
    this.sprite.body.velocity.x = 0;
    if (this.player.controls.upKey.isDown && this.sprite.body.blocked.down) {
        this.sprite.body.velocity.y -= 250;
    }
    if (this.player.controls.leftKey.isDown) {
      //Mirroring on left movement
      if(this.sprite.scale.x > 0){
          this.sprite.scale.x *= -1;
      };
      this.sprite.body.velocity.x -= 150;
    } else if (this.player.controls.rightKey.isDown) {
      //Return sprite to default on right movement
      if(this.sprite.scale.x < 0){
        this.sprite.scale.x *= -1;
      }
      this.sprite.body.velocity.x += 150;
    }
    if(this.player.controls.actionKey.isDown) {
      this.weapon.fireAtXY(this.sprite.scale.x < 0 ? this.sprite.body.x - 50 : this.sprite.body.x + 50,this.sprite.body.y + 16);
    }
  };

  return this;

};
