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
  this.moveSpeed = null;
  this.positionX = null;
  this.positionY = null;
  this.team = null;

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

  this.move = function(x, y) {
      this.sprite.x = x;
      this.sprite.y = y;
  };

  return this;

};
