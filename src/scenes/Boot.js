import toy from "../assets/images/rubber_duck.png";

class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }
  preload() {
    this.load.image("toy", toy);
  }
  create() {
    this.scene.start("Loading");
  }
}

export default Boot;
