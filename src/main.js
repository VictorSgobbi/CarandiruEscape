// src/main.js

// NÃO use mais: import Phaser from 'phaser';

const mapWidth  = 70 * 32;   // 70 tiles × 32px
const mapHeight = 60 * 32;   // 60 tiles × 32px

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('map',   'assets/map/map.png');
    this.load.spritesheet('player', 'assets/player/personagens_sem_fundo.png', {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.spritesheet('items', 'assets/items/items.png', { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    // adiciona mapa de fundo
    this.add.image(0, 0, 'map').setOrigin(0);

    // limites do mundo e da câmera
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

    // cria jogador no centro
    this.player = this.physics.add
      .sprite(mapWidth/2, mapHeight/2, 'player')
      .setScale(0.25)
      .setCollideWorldBounds(true);

    // controles de teclado
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 200;
    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown)  this.player.body.setVelocityX(-speed);
    if (this.cursors.right.isDown) this.player.body.setVelocityX( speed);
    if (this.cursors.up.isDown)    this.player.body.setVelocityY(-speed);
    if (this.cursors.down.isDown)  this.player.body.setVelocityY( speed);

    this.cameras.main.startFollow(this.player, true);
  }
}

const config = {
  type: Phaser.AUTO,
  width:  800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: [ GameScene ]
};

// Cria o jogo usando a classe Phaser global
new Phaser.Game(config);
