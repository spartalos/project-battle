var ArenaRole = function(){
  this.character = null;
  this.healthLabel = null;
  this.nameLabel = null;
  this.labelX = null;
  this.labelY = null;

  this.initRole = function(character, labelX, labelY){
    this.character = character;
    this.labelX = labelX;
    this.labelY = labelY;
    this.createLabel();
    return this;
  };

  this.createLabel = function(){
    if(this.healthLabel && this.nameLabel){
      this.healthLabel.destroy();
      this.nameLabel.destroy();
    }
    this.healthLabel = game.add.text(this.labelX, this.labelY,
                                      'Health: ' + this.character.health,
                                      {font: '20px Arial', fill: '#ffffff'});
    this.nameLabel = game.add.text(this.labelX, this.labelY + 20,
                                      'Name: ' + this.character.name,
                                      {font: '20px Arial', fill: '#ffffff'});
  };
  return this;
};
