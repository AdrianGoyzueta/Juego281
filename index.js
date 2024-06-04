import { Menu } from "./menu.js";
import { Ajustes } from "./ajustes.js";
import { Juego } from "./juego.js";
import { Creditos } from "./creditos.js";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [Menu, Ajustes, Juego, Creditos],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: false,
    }
  }
}

var game = new Phaser.Game(config);