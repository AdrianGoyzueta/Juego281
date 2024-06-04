class AnimateSprite extends Phaser.Scene {
  constructor() {
    super({ key: 'AnimateSprite' })
  }
  preload() {
    this.load.image('JuegoBG', './images/JuegoBG.png');
    this.load.spritesheet('Sprite', './images/Sprite.png', { frameWidth: 172, frameHeight: 97});
  }
  create() {
    this.bg = this.add.image(1317, 1317, 'JuegoBG');

    this.player = this.physics.add.sprite(100, 450, 'Sprite');
    this.player.body.allowGravity = false;
    this.anims.create({
      key: 'right', // Nombre de la animación
      frames: this.anims.generateFrameNumbers('Sprite', { start: 0, end: 2 }), // Rango de frames en la spritesheet
      frameRate: 10, // Velocidad de la animación (cuadros por segundo)
      repeat: -1, // -1 para repetir infinitamente, puedes ajustarlo según tus necesidades
    });

    this.anims.create({
      key: 'left', // Nombre de la animación
      frames: this.anims.generateFrameNumbers('Sprite', { start: 0, end: 2 }), // Rango de frames en la spritesheet
      frameRate: 10, // Velocidad de la animación (cuadros por segundo)
      repeat: -1, // -1 para repetir infinitamente, puedes ajustarlo según tus necesidades
    });

    this.anims.create({
      key: 'turn', // Nombre de la animación
      frames: this.anims.generateFrameNumbers('Sprite', { start: 0, end: 0 }), // Rango de frames en la spritesheet
      frameRate: 10, // Velocidad de la animación (cuadros por segundo)
      repeat: -1, // -1 para repetir infinitamente, puedes ajustarlo según tus necesidades
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.angle = 180;
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.angle = 0;
      this.player.anims.play('right', true);
    }
    else {
      this.player.setVelocityX(0);
      this.player.angle = 0;
      this.player.anims.play('turn');
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

}


const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [AnimateSprite],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: false,
    }
  }
}

var game = new Phaser.Game(config);