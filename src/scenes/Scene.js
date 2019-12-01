class Scene extends Phaser.Scene {
  constructor(config) {
    super("Scene");
  }
  init() {
    this.stats = {
      health: 100,
      fun: 100
    };
    this.Decay = {
      health: -5,
      fun: -5
    };
    this.buttons;
    this.uiBlocked;
  }

  create() {
    this.background = this.add.sprite(0, 0, "backyard").setInteractive();
    this.background.setOrigin(0, 0);
    this.background.on("pointerdown", this.placeItem);
    this.pet = this.add.sprite(100, 200, "pet", 0).setInteractive();
    this.input.setDraggable(this.pet);
    this.input.on("drag", (pointer, object, x, y) => {
      object.x = x;
      object.y = y;
    });

    this.createUI();
    this.createHud();
    //this.refreshHud();
    this.timedEventStats = this.time.addEvent({
      delay: 1000,
      repeat: -1,
      callback: function() {
        this.updateStats(this.Decay);
      },
      callbackScope: this
    });
  }

  createUI() {
    this.apple = this.add.sprite(72, 570, "apple").setInteractive();
    this.apple.customStates = { health: 10, fun: 0 };
    this.apple.on("pointerdown", this.pickItem);
    this.candy = this.add.sprite(144, 570, "candy").setInteractive();
    this.candy.customStates = { health: -10, fun: 10 };
    this.candy.on("pointerdown", this.pickItem);
    this.toy = this.add.sprite(72 * 3, 570, "toy").setInteractive();
    this.toy.customStates = { health: 0, fun: 15 };
    this.toy.on("pointerdown", this.pickItem);
    this.rotate = this.add.sprite(72 * 4, 570, "rotate").setInteractive();
    this.rotate.on("pointerdown", this.rotatePet);
    this.rotate.customStates = { health: 0, fun: 10 };
    this.buttons = [this.apple, this.candy, this.toy, this.rotate];

    this.uiBlocked = false;

    this.resetUI();
  }

  rotatePet() {
    if (this.uiBlocked) return;
    this.scene.resetUI();
    this.scene.uiBlocked = true;
    this.alpha = 0.5;
    let scene = this.scene;
    let rotateTween = scene.tweens.add({
      targets: scene.pet,
      duration: 600,
      angle: 360,
      pause: false,
      callbackScope: this,
      onComplete: function(tween, sprites) {
        scene.stats.fun += this.customStates.fun;
        this.scene.refreshHud();
        this.scene.resetUI();
      }
    });
  }

  pickItem() {
    if (this.scene.uiBlocked) return console.log("BLOCKED");
    this.scene.resetUI();
    this.scene.selectedItem = this;
    this.alpha = 0.5;
  }

  placeItem(pointer, x, y) {
    if (this.scene.uiBlocked) return console.log("BLOCKED");
    console.log(this.scene.uiBlocked);
    if (!this.scene.selectedItem) return;
    let newItem = this.scene.add.sprite(
      x,
      y,
      this.scene.selectedItem.texture.key
    );
    this.scene.uiBlocked = true;
    let scene = this.scene;
    let petMove = this.scene.tweens.add({
      targets: this.scene.pet,
      duration: 500,
      x: newItem.x,
      y: newItem.y,
      paused: false,
      onComplete: (tween, sprites) => {
        newItem.destroy();
        // event listener for when spritesheet animation ends
        this.scene.pet.on(
          "animationcomplete",
          function() {
            // set pet back to neutral face
            this.scene.pet.setFrame(0);

            // clear UI
            this.scene.resetUI();
            this.scene.refreshHud();
          },
          this
        );

        // play spritesheet animation
        this.scene.pet.play("funnyfaces");

        console.log(this.scene.stats);
      }
    });
    this.scene.stats.health += this.scene.selectedItem.customStates.health;
    this.scene.stats.fun += this.scene.selectedItem.customStates.fun;
  }

  createHud = () => {
    this.healthText = this.add.text(20, 20, `Health: ${this.stats.health}`, {
      font: "24px Arial"
    });
    this.funText = this.add.text(175, 20, `Fun: ${this.stats.fun}`, {
      font: "24px Arial"
    });
  };

  refreshHud = () => {
    this.healthText.setText(`Health: ${this.stats.health}`);
    this.funText.setText(`Fun: ${this.stats.fun}`);
  };

  resetUI() {
    this.selectedItem = null;
    this.buttons.forEach(element => {
      element.alpha = 1;
    });
    this.uiBlocked = false;
  }

  updateStats = statDiff => {
    // flag to see if it's game over
    let isGameOver = false;

    // more flexible
    for (const stat in statDiff) {
      if (statDiff.hasOwnProperty(stat)) {
        this.stats[stat] += statDiff[stat];
        // stats can't be less than zero
        if (this.stats[stat] < 0) {
          isGameOver = true;
          this.stats[stat] = 0;
        }
      }
    }

    // refresh HUD
    this.refreshHud();

    // check to see if the game ended
    if (isGameOver) this.gameOver();
  };

  gameOver = () => {
    this.scene.uiBlocked = true;
    this.pet.setFrame(4);
    this.time.addEvent({
      delay: 2000,
      repeat: 0,
      callback: () => {
        console.log("oops");
        this.scene.start("Home");
      }
    });
  };
}

export default Scene;
