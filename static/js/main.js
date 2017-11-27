var game = new Phaser.Game(1280, 700, Phaser.AUTO, 'canvasDiv', {
    create: function(){
        game.stage.disableVisibilityChange = true;
    }

});
var socket = io('http://localhost:5000');

game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('table', tableState);
game.state.add('arena', arenaState);
game.state.add('win', winState);

game.state.start('load');