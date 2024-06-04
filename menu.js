import {datos} from './datos.js';


export class Menu extends Phaser.Scene {
  constructor () {
    super({ key: 'Menu' });
  }

  preload () {
    this.load.image('MenuBG', '/images/MenuBG.jpg');
    this.load.image('BotonJugar', '/images/BotonJugar.png');
    this.load.image('BotonAjustes', '/images/BotonAjustes.png');
    this.load.image('BotonCreditos', '/images/BotonCreditos.png');
    this.load.image('Titulo', '/images/Titulo.png');
    this.load.image('MarcoPersonaje', '/images/MarcoP.png');
    this.load.spritesheet('Bambi', './images/Bambi.png', { frameWidth: 75, frameHeight: 75});
    this.load.spritesheet('MickyMouse', './images/MickyMouse.png', { frameWidth: 75, frameHeight: 75});
    this.load.spritesheet('Poo', './images/Poo.png', { frameWidth: 75, frameHeight: 75});
    this.load.spritesheet('Simba', './images/Simba.png', { frameWidth: 75, frameHeight: 75});
    this.load.spritesheet('Stich', './images/Stich.png', { frameWidth: 75, frameHeight: 75});
    this.load.spritesheet('Tigger', './images/Tigger.png', { frameWidth: 75, frameHeight: 75});
    this.load.audio('MenuAudio', '/audio/Menu.mp3')
  }

  create () {

    const width = this.sys.canvas.width;
    const height = this.sys.canvas.height;

    if (! datos.audioM) {
      datos.audioM = this.sound.add('MenuAudio', {loop: true});
      datos.audioM.play();
      datos.audioM.setVolume(datos.volumen / 5);
    }
    else if (! datos.audioM.isPlaying) {
      datos.audioM.play();
      datos.audioJ.destroy();
    }

    this.bg = this.add.image(0, 0, 'MenuBG');
    this.bg.setDisplaySize(width, height);
    this.bg.setPosition(width / 2, height / 2);

    const titulo = this.add.image(width / 2, height / 2 - 200, 'Titulo');

    const jugar = this.add.image(width - 110, height - 217.5 , 'BotonJugar');
    jugar.setInteractive();
    jugar.on('pointerdown', () => {
      this.scene.start('Juego');
    });
//132.5
    const ajustes = this.add.image(width - 110, height - 132.5, 'BotonAjustes');
    ajustes.setInteractive();
    ajustes.on('pointerdown', () => {
      this.scene.start('Ajustes');     
    });

    const creditos = this.add.image(width - 110, height - 47.5, 'BotonCreditos');
    creditos.setInteractive();
    creditos.on('pointerdown', () => {
      this.scene.start('Creditos');
    });

    const marco = this.add.image(110, height - 135, 'MarcoPersonaje');
    marco.setDisplaySize(200, 250);

    this.personaje = this.add.sprite(110, height - 135, datos.personaje);
  }
}