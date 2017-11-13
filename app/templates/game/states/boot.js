'use strict';

function Boot() {
}

Boot.prototype = {

	init : function() {
		// still load if unfocus
		this.stage.disableVisibilityChange = !0;
		this.game.add.text(100, 100, "Please reload it...");
	},

	preload : function() {
		this.load.image('LoadingBar_Outer', 'assets/LoadingBar_Outer.png');
		this.load.image('LoadingBar_Inner', 'assets/LoadingBar_Inner.png');
	},
	create : function() {

		this.setupStage();
		this.game.input.maxPointers = 1;
		this.game.state.start('preload');
	},
	setupStage : function() {
		var b = this.game.scale;
		b.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		b.pageAlignHorizontally = !0;
		b.pageAlignVertically = !0;
		b.enterIncorrectOrientation.add(this.onEnterIncorrectOrientation, this);
		b.leaveIncorrectOrientation.add(this.onLeaveIncorrectOrientation, this);
		b.updateLayout(!0);
		
		// this.stage.backgroundColor = 11193204; // green
		this.stage.backgroundColor = 87654321; // lightblue
	},
	onEnterIncorrectOrientation : function() {
		document.getElementById("orientation").style.display = "block", document.body.style.marginBottom = "0px";
	},
	onLeaveIncorrectOrientation : function() {
		document.getElementById("orientation").style.display = "none", document.body.style.marginBottom = "100px";
	}

};

module.exports = Boot;