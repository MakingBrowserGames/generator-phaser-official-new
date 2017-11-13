'use strict';

function Preload() {}

Preload.prototype = {

  init: function() {
    // still load if unfocus
    this.stage.disableVisibilityChange = !0;
  },
  preload: function() {
    // load everything here
    this.initPreloadBar();
    this.addLoadingText();
    this.loadAssets();

  },
  create: function() {
    this.game.state.start("menu", !0, !1, !0);
  },
  update: function() {

  },
  initPreloadBar: function() {

    // loadding bars
    this.LoadingBar_Outer = this.add.image(0, 0, 'LoadingBar_Outer');
    this.LoadingBar_Inner = this.add.sprite(0, 0, 'LoadingBar_Inner');

    // Center the preload bar
    this.LoadingBar_Outer.anchor.set(.5, .5);
    this.LoadingBar_Outer.x = this.game.width / 2 - .5;
    this.LoadingBar_Outer.y = this.game.height / 2;

    this.LoadingBar_Inner.x = this.game.width / 2 - .5 -
      this.LoadingBar_Inner.width / 2;
    this.LoadingBar_Inner.y = this.game.height / 2 -
      this.LoadingBar_Inner.height / 2 - 1.5;

    this.load.setPreloadSprite(this.LoadingBar_Inner);
  },
  addLoadingText: function() {
    var style = {
      font: "45px font",
      fill: "#FFFFFF",
      align: "center"
    };
    this.loadingText = this.game.add.text(0, 0, "0%", style);
    this.loadingText.anchor.set(.5, .5);
    this.loadingText.position.set(this.game.world.width / 2,
      this.game.world.height / 2 + 180);
    this.loadingText.setShadow(2, 2, "#666666", 2);
    this.loadingText.update();
  },
  loadAssets: function() {

    // Fonts
    this.load.bitmapFont("font", "assets/fonts/font.png",
      "assets/fonts/font.fnt", null, 1);

    // Imgaes
    this.load.image('yeoman', 'assets/yeoman-logo.png');

  },
  loadUpdate: function() {
    this.loadingText.setText(this.load.progress.toString() + "%");
  },
  shudown: function() {

    this.LoadingBar_Outer.destroy();
    this.LoadingBar_Inner.destroy();
    this.loadingText.destroy();

  }

};

module.exports = Preload;
