var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'canvasDiv');

game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('table', tableState);
game.state.add('arena', arenaState);
game.state.add('win', winState);

game.state.start('load');
