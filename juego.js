import {datos} from './datos.js';

var vidas = new Array(datos.vidas);

class Arbol {
  constructor (barbol) {
    this.sprite = barbol;
    this.vida = 100;
    this.quemado = false;
    this.last = 0;
    this.change = 0;
  }

  quemar (tiempo) {
    if (this.quemado) {
      this.vida--;
      this.last = tiempo;
      if (this.vida == 0) {
        this.sprite.destroy();
        this.quemado = false;
        if (vidas.length > 0){
          vidas.pop().setVisible(false);
        }
        if (vidas.length == 0) {
          return true;
        }
      }
    }
    return false;
  }
}

export class Juego extends Phaser.Scene {
  constructor () {
    super({ key: 'Juego' });
  }

  preload () {
    this.load.image('JuegoBG', './images/JuegoBG.png');
    this.load.image('Corazon', './images/Corazon.png');
    this.load.image('Pausa', './images/Pausa.png');
    this.load.image('Home', './images/Home.png');
    this.load.image('Reiniciar', './images/Reiniciar.png');
    this.load.image('Ronda1', './images/Ronda1.png');
    this.load.image('Ronda2', './images/Ronda2.png');
    this.load.image('Ronda3', './images/Ronda3.png');
    this.load.image('Ronda4', './images/Ronda4.png');
    this.load.image('Ronda5', './images/Ronda5.png');
    this.load.image('Ronda6', './images/Ronda6.png');
    this.load.image('Ronda7', './images/Ronda7.png');
    this.load.image('GameOver', './images/GameOver.png');
    this.load.image('Ganaste', './images/Ganaste.png');
    this.load.spritesheet('Barbol', './images/Barbol.png', { frameWidth: 80, frameHeight: 200});
    this.load.spritesheet('Llama', './images/Llama.png', { frameWidth: 25, frameHeight: 57});
    this.load.image('Globo', './images/Globo.png');
    this.load.audio('JuegoAudio', './audio/Juego.mp3');
  }

  create () {

    this.isPaused = false;
    this.physics.world.setBounds(0, 0, 2634, 2634);
    this.ultimoLanzamiento = 0;
    this.ronda = 1;
    this.llamasVivas = 10;

    datos.audioJ = this.sound.add('JuegoAudio', {loop: true});
    datos.audioJ.play();
    datos.audioJ.setVolume(datos.volumen / 5);
    datos.audioM.stop();

    const width = this.sys.canvas.width;
    const height = this.sys.canvas.height;

    this.bg = this.add.image(1317, 1317, 'JuegoBG');

    if (this.anims.anims.entries.turn) {
      this.anims.remove('turn');
      this.anims.remove('left');
      this.anims.remove('right');
    }
    else {
      this.anims.create({
        key: 'BR',
        frames: this.anims.generateFrameNumbers('Barbol', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1,
      });
  
      this.anims.create({
        key: 'BL',
        frames: this.anims.generateFrameNumbers('Barbol', { start: 4, end: 7 }),
        frameRate: 8,
        repeat: -1,
      });
  
      this.anims.create({
        key: 'BRF',
        frames: this.anims.generateFrameNumbers('Barbol', { start: 8, end: 11 }),
        frameRate: 8,
        repeat: -1,
      });
  
      this.anims.create({
        key: 'BLF',
        frames: this.anims.generateFrameNumbers('Barbol', { start: 12, end: 15 }),
        frameRate: 8,
        repeat: -1,
      });
  
      this.anims.create({
        key: 'ML',
        frames: this.anims.generateFrameNumbers('Llama', { start: 0, end: 7 }),
        frameRate: 8,
        repeat: -1,
      });
    }

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(datos.personaje, { start: 4, end: 7 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(datos.personaje, { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers(datos.personaje, { start: 0, end: 0 }),
      frameRate: 1,
      repeat: -1,
    });


    this.personaje = this.physics.add.sprite(1317, 1317, datos.personaje);
    this.personaje.body.allowGravity = false;
    this.personaje.setCollideWorldBounds(true);
    this.personaje.setBounce(1);

    this.barbols = new Array(15);
    for (let i = 0; i < this.barbols.length; i++) {
      const x = Phaser.Math.Between(50, 2584);
      const y = Phaser.Math.Between(50, 2584);
      this.barbols[i] = new Arbol(this.physics.add.sprite(x, y, 'Barbol'));
      this.barbols[i].sprite.body.allowGravity = false;
      this.barbols[i].sprite.setCollideWorldBounds(true);
      this.barbols[i].sprite.setBounce(1);
      this.barbols[i].sprite.setVelocityY(y > height / 2 ? -100 : 100);
      this.barbols[i].sprite.setVelocityX(x > width / 2 ? -100 : 100);
    }

    this.llamas = new Array(10);
    for (let i = 0; i < this.llamas.length; i++) {
      const x = Phaser.Math.Between(50, 2584);
      const y = Phaser.Math.Between(50, 2584);
      this.llamas[i] = this.physics.add.sprite(x, y, 'Llama');
      this.llamas[i].anims.play('ML', true);
      this.llamas[i].body.allowGravity = false;
      this.llamas[i].setCollideWorldBounds(true);
      this.llamas[i].setBounce(1);
      this.llamas[i].setVelocityY(y > height / 2 ? -100 : 100);
      this.llamas[i].setVelocityX(x > width / 2 ? -100 : 100);
    }

    for (let i = 0; i < this.barbols.length; i++) {
      for (let j = 0; j < this.barbols.length; j++) {
        if (i != j) {
          this.physics.add.collider(this.barbols[i].sprite, this.barbols[j].sprite);
        }
      }
      this.physics.add.collider(this.barbols[i].sprite, this.personaje);
      this.physics.add.collider(this.barbols[i].sprite, this.llamas, () => {
        this.barbols[i].quemado = true;
      });
    }
    
    this.cameras.main.setBounds(0, 0, 2634, 2634);
    this.cameras.main.startFollow(this.personaje);

    this.pausa = this.add.image(width - 25, 25, 'Pausa');
    this.pausa.setScrollFactor(0);
    this.pausa.setInteractive();
    this.pausa.on('pointerdown', () => {
      if (this.isPaused) {
        this.physics.resume();
        this.isPaused = false;
      } 
      else {
        this.physics.pause();
        this.isPaused = true;
      }
    });

    this.home = this.add.image(width - 80, 25, 'Home');
    this.home.setScrollFactor(0);
    this.home.setInteractive();
    this.home.on('pointerdown', () => {
      this.scene.switch('Menu');
    });

    this.reiniciar = this.add.image(width - 135, 25, 'Reiniciar');
    this.reiniciar.setScrollFactor(0);
    this.reiniciar.setInteractive();
    this.reiniciar.on('pointerdown', () => {
      datos.audioJ.destroy();
      this.physics.resume();
      this.isPaused = false;
      this.create();
    });

    this.rondaIMG = this.add.text(width - 265, 25, `Ronda ${this.ronda}`, { fontFamily: 'Arial', fontSize: 36, color: '#ffffff' })
    this.rondaIMG.setOrigin(0.5);
    this.rondaIMG.setScrollFactor(0);

    vidas = new Array(datos.vidas);
    for (let i = 0; i < vidas.length; i++) {
      vidas[i] = this.add.image(20 + (i * 35), 20, 'Corazon');
      vidas[i].setScrollFactor(0);
    }

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    var g;
    const l = this.cursors.left.isDown;
    const r = this.cursors.right.isDown;
    const u = this.cursors.up.isDown;
    const d = this.cursors.down.isDown;

    if (! (l || r || u || d) ) {
      this.personaje.setVelocityX(0);
      this.personaje.setVelocityY(0);
      this.personaje.anims.play('turn', true);
    }
    else {
      if (l) {
        this.personaje.anims.play('right', true);
      }
      else {
        this.personaje.anims.play('left', true);
      }
      if (u) {
        this.personaje.setVelocityY(-150);
      }
      else if (d) {
        this.personaje.setVelocityY(150);
      }
      else {
        this.personaje.setVelocityY(0);
      }
      if (r) {
        this.personaje.setVelocityX(150);
      }
      else if (l) {
        this.personaje.setVelocityX(-150);
      }
      else {
        this.personaje.setVelocityX(0);
      }
    }

    if (this.cursors.space.isDown && this.time.now - this.ultimoLanzamiento > 500) {
      this.ultimoLanzamiento = this.time.now;
      g = this.physics.add.image(this.personaje.x, this.personaje.y, 'Globo');
      g.setDisplaySize(25, 20);
      g.body.allowGravity = false;
      this.llamas.forEach((llama) => {
        this.physics.add.collider(g, llama, () => {
          llama.destroy();
          g.destroy();
          this.llamasVivas--;
        });
      })
      if (! (l || r || u || d) ) {
        g.setVelocityX(500);
      }
      else {
        if (r) {
          g.setVelocityX(500);
        }
        else if (l) {
          g.setVelocityX(-500);
        }
        if (d) {
          g.setVelocityY(500);
        }
        else if (u) {
          g.setVelocityY(-500);
        }
      }
    }

    this.barbols.forEach((barbol) => {
      if (barbol.vida <= 0) {
        return ;
      }
      if (g) {
        this.physics.add.collider(barbol.sprite, g, () => {
          g.destroy();
          barbol.quemado = false;
          let v = Phaser.Math.Between(100, 150);
          barbol.sprite.body.setVelocityX(barbol.sprite.body.velocity.x > 0 ? v : -v);
          v = Phaser.Math.Between(100, 150);  
          barbol.sprite.body.setVelocityY(barbol.sprite.body.velocity.y > 0 ? v : -v);
        });
      }

      if (this.time.now - barbol.change > 5000) {
        barbol.change = this.time.now;
        let v = Phaser.Math.Between(100, 150);
        barbol.sprite.body.setVelocityX(Phaser.Math.Between(0, 1) > 0.5 ? v : -v);
        v = Phaser.Math.Between(100, 150);
        barbol.sprite.body.setVelocityY(Phaser.Math.Between(0, 1) > 0.5 ? v : -v);
      }

      if (!this.isPaused && barbol.quemado) {
        barbol.sprite.anims.play(barbol.sprite.body.velocity.x > 0 ? 'BRF' : 'BLF', true);
        if (this.time.now - barbol.last > 1000 && barbol.quemar(this.time.now)) {
          this.physics.pause();
          this.anims.pauseAll();
          this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'GameOver').setScrollFactor(0);
        }      
      }
      else if (!this.isPaused) {
        barbol.sprite.anims.play(barbol.sprite.body.velocity.x > 0 ? 'BR' : 'BL', true);
      }
    });

    if (this.llamasVivas == 0) {
      this.ronda++;
      if (this.ronda > datos.rondas) {
        this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'Ganaste').setScrollFactor(0);
        this.physics.pause();
        this.barbols.forEach((barbol) => {
          if (barbol) {
            barbol.quemado = false;
            barbol.sprite.anims.play(barbol.sprite.body.velocity.x > 0 ? 'BR' : 'BL', true);
          }
        });
        this.anims.pauseAll();
      }
      else {
        this.rondaIMG.setText(`Ronda ${this.ronda}`)
        this.llamasVivas = this.llamas.length;
        const width = this.sys.canvas.width;
        const height = this.sys.canvas.height;
        for (let i = 0; i < this.llamas.length; i++) {
          const x = Phaser.Math.Between(50, 2584);
          const y = Phaser.Math.Between(50, 2584);
          this.llamas[i] = this.physics.add.sprite(x, y, 'Llama');
          this.llamas[i].anims.play('ML', true);
          this.llamas[i].body.allowGravity = false;
          this.llamas[i].setCollideWorldBounds(true);
          this.llamas[i].setBounce(1);
          this.llamas[i].setVelocityY(y > height / 2 ? -100 : 100);
          this.llamas[i].setVelocityX(x > width / 2 ? -100 : 100);
        }
      }
    }
  }
}
