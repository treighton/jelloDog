import "phaser";

import Loading from "./scenes/Loading";
import Boot from "./scenes/Boot";
import Scene from "./scenes/Scene";
import Home from "./scenes/Home";

const gameConfig = {
  width: 360,
  height: 640,
  scene: [Boot, Loading, Home, Scene],
  title: "Virtual Pet",
  pixelArt: false,
  backgroundColor: "ffffff",
  parent: "game_id",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
};

new Phaser.Game(gameConfig);
