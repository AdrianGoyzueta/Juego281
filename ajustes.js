import { datos } from './datos.js';

const personajes = ['Bambi', 'MickyMouse', 'Poo', 'Simba', 'Stich', 'Tigger'];
var ip = 0;
const dificultades = ['MuyFacil', 'Facil', 'Medio', 'Dificil', 'MuyDificil'];
var id = 2;

export class Ajustes extends Phaser.Scene {
  constructor () {
    super({ key: 'Ajustes' });
  }

  preload () {
    this.load.image('MarcoAjustes', './images/MarcoA.png');
    this.load.image('BotonSalir', './images/BotonSalir.png');
    this.load.image('ControlV', './images/ControlV.png');
    this.load.image('Sig', './images/Sig.png');
    this.load.image('Ant', './images/Ant.png');
    this.load.image('MuyFacil', './images/MuyFacil.png');
    this.load.image('Facil', './images/Facil.png');
    this.load.image('Medio', './images/Medio.png');
    this.load.image('Dificil', './images/Dificil.png');
    this.load.image('MuyDificil', './images/MuyDificil.png');
  }

  create () {

    const width = this.sys.canvas.width;
    const height = this.sys.canvas.height;

    const bg = this.add.image(0, 0, 'MenuBG');
    bg.setDisplaySize(width, height);
    bg.setPosition(width / 2, height / 2);

    const marco = this.add.image(width / 2, height / 2, 'MarcoAjustes');
    const cv = this.add.image(width / 2 - 120 - (39 * (5 - datos.volumen)), height / 2 + 70, 'ControlV');
    const sv = this.add.image(width / 2 - 60, height / 2 + 70, 'Sig');
    sv.setInteractive();
    sv.on('pointerdown', () => {
      if (datos.volumen < 5) {
        cv.setPosition(cv.x + 39, cv.y);
        datos.volumen++;
        datos.audioM.setVolume(datos.volumen / 5);
      }
    })
    const av = this.add.image(width / 2 - 375, height / 2 + 70, 'Ant');
    av.setInteractive();
    av.on('pointerdown', () => {
      if (datos.volumen > 0) {
        cv.setPosition(cv.x - 39, cv.y);
        datos.volumen--;
        datos.audioM.setVolume(datos.volumen / 5);
      }
    })

    const cd = this.add.image(width / 2 - 217.5, height / 2 - 90, 'Medio');
    const sd = this.add.image(width / 2 - 60, height / 2 - 90, 'Sig');
    sd.setInteractive();
    sd.on('pointerdown', () => {
      if (id < 4) {
        id++;
        cd.setTexture(dificultades[id]);
        datos.vidas--;
        datos.rondas++;
      }
    })
    const ad = this.add.image(width / 2 - 375, height / 2 - 90, 'Ant');
    ad.setInteractive();
    ad.on('pointerdown', () => {
      if (id > 0) {
        id--;
        cd.setTexture(dificultades[id]);
        datos.vidas++;
        datos.rondas--;
      }
    })

    const personaje = this.add.image(width / 2 + 225, height / 2 - 80, datos.personaje);
    const sp = this.add.image(width / 2 + 355, height / 2 - 80, 'Sig');
    sp.setInteractive();
    sp.on('pointerdown', () => {
      ip++;
      if (ip > 5) {
        ip = 0;
      }
      datos.personaje = personajes[ip];
      personaje.setTexture(datos.personaje);
    });
    const ap = this.add.image(width / 2 + 95, height / 2 - 80, 'Ant');
    ap.setInteractive();
    ap.on('pointerdown', () => {
      ip--;
      if (ip < 0) {
        ip = 5;
      }
      datos.personaje = personajes[ip];
      personaje.setTexture(datos.personaje);
    });

    
    const salir = this.add.image(width / 2, height / 2 + 250, 'BotonSalir');
    salir.setInteractive();
    
    salir.on('pointerdown', () => {
      this.scene.switch('Menu');
    });
  }
}