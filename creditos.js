export class Creditos extends Phaser.Scene {
  constructor() {
    super({ key: "Creditos" });
  }

  preload() {
    this.load.image('BotonSalir', './images/BotonSalir.png');
  }

  create() {
    const width = this.sys.canvas.width;
    const height = this.sys.canvas.height;

    this.bg = this.add.image(0, 0, 'MenuBG');
    this.bg.setDisplaySize(width, height);
    this.bg.setPosition(width / 2, height / 2);

    this.add.text(width / 2, height / 2 - 200, 'Creditos', { fontFamily: 'Arial', fontSize: 50, color: '#ffffff' }).setOrigin(0.5);
    this.add.text(width / 2, height / 2 - 100, 'Creador: Goyzueta Mérida Adrián Matías', { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' }).setOrigin(0.5);
    this.add.text(width / 2, height / 2 - 50, 'Musica Obtenida de Loudly', { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' }).setOrigin(0.5);
    this.add.text(width / 2, height / 2, 'Personajes pertenecientes a Disney', { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' }).setOrigin(0.5);
    this.add.text(width / 2, height / 2 + 50, 'Desarrollado en Phaser V3.60.0', { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' }).setOrigin(0.5);

    const salir = this.add.image(width / 2, height / 2 + 200, 'BotonSalir');
    salir.setInteractive();
    salir.on('pointerdown', () => {
      this.scene.start('Menu');
    });
  }
}