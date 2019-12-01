import backyard from "../assets/images/backyard.png";
import apple from "../assets/images/apple.png";
import candy from "../assets/images/candy.png";
import rotate from "../assets/images/rotate.png";
import toy from "../assets/images/rubber_duck.png";
import pet from "../assets/images/pet.png";

class Loading extends Phaser.Scene {
  constructor() {
    super("Loading");
  }

  preload() {
    let logo = this.add.sprite(this.sys.game.config.width / 2, 250, "toy");

    let bgBar = this.add.graphics();
    let barW = 150;
    let barH = 30;
    bgBar.setPosition(
      this.sys.game.config.width / 2 - barW / 2,
      this.sys.game.config.height / 2 - barH / 2
    );
    bgBar.fillStyle(0xf5f5f5, 1);
    bgBar.fillRect(0, 0, barW, barH);

    let progressBar = this.add.graphics();
    progressBar.setPosition(
      this.sys.game.config.width / 2 - barW / 2,
      this.sys.game.config.height / 2 - barH / 2
    );

    this.load.on("progress", value => {
      progressBar.clear();
      progressBar.fillStyle(0x9ad98d, 1);
      progressBar.fillRect(0, 0, value * barW, barH);
    });

    this.load.image("backyard", backyard);
    this.load.image("apple", apple);
    this.load.image("candy", candy);
    this.load.image("rotate", rotate);
    this.load.image("toy", toy);
    this.load.spritesheet("pet", pet, {
      frameWidth: 97,
      frameHeight: 83,
      margin: 1,
      spacing: 1
    });
  }

  create() {
    this.anims.create({
      key: "funnyfaces",
      frames: this.anims.generateFrameNames("pet", { frames: [1, 2, 3] }),
      frameRate: 7,
      yoyo: true,
      repeat: 0 // to repeat forever: -1
    });
    this.scene.start("Home");
  }
}

export default Loading;
