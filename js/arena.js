var arenaState = {

  attackingCharacter: null,
  defendingCharacter: null,

  arena: {
    tilemap: null,
    floorLayer: null,
    terrainLayer: null,
    object: null,
    characterGroup: null,
    initArena: function() {
      this.tilemap = game.add.tilemap('arenaTileMap');
      this.tilemap.addTilesetImage('jeroomtileset', 'tilesheetImage');
      this.floorLayer = this.tilemap.createLayer("FloorLayer");
      this.floorLayer = this.tilemap.createLayer("TerrainLayer");
      this.objects = this.tilemap.objects['ObjectLayer'];
      this.characterGroup = game.add.group();
    },

    spawnCharacters: function(spawnId) {
      var spawnAreaObject = null;
      for (i = 0; i < this.objects.length; i++) {
        if (this.objects[i].type == spawnId) {
          spawnAreaObject = this.objects[i];
          break;
        }
      }
      var widthInTiles = spawnAreaObject.width / 32;
      var heightInTiles = spawnAreaObject.height / 32;
      var charId = 0;

      console.log(this.attackingCharacter);
      game.add.existing(this.attackingCharacter.sprite);

    }
  },

  init : function(attacking, defending){
    this.attackingCharacter = attacking;
    this.defendingCharacter = defending;
    console.log(this.attackingCharacter);
    console.log(this.defendingCharacter);
  },

  preload: function(){

  },

  create: function(){

    this.arena.initArena();
    this.arena.spawnCharacters('spawnA');

  },

  update: function(){

  }

};
