var Character = function(){

  this.id = null;
  this.name = null;
  this.health = null;
  this.damage = null;
  this.type = null;
  this.tileId = null;
  this.sprite = null;

  this.initFromJSON = function(id){
    var character = JSON.parse(characters)[id];
    this.id = character.id;
    this.name = character.name;
    this.health = character.health;
    this.damage = character.damage;
    this.type = character.type;
    this.tileId = character.tileId;
    return this;
  };

  return this;

};
