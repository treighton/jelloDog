class Home extends Phaser.Scene {
  constructor(config) {
    super("Home");
  }
  create() {
    this.background = this.add.sprite(0, 0, "backyard").setInteractive();
    this.background.setOrigin(0, 0);
    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;
    let text = this.add.text(gameW / 2, gameH / 2, `JELLO DOG`, {
      font: "32px Arial",
      fill: "#ffffff"
    });
    text.setOrigin(0.5, 0.5);
    text.depth = 1;
    let textBg = this.add.graphics();
    textBg.fillStyle(0x000000, 0.7);
    textBg.fillRect(
      gameW / 2 - text.width / 2 - 10,
      gameH / 2 - text.height / 2 - 10,
      text.width + 20,
      text.height + 20
    );

    let subText = this.add.text(gameW / 2, gameH / 2 + 45, `(click to start)`, {
      font: "16px Arial",
      fill: "#ffffff"
    });
    subText.setOrigin(0.5, 0.5);
    this.background.on(
      "pointerdown",
      function() {
        this.scene.start("Scene");
      },
      this
    );
  }
}

export default Home;
