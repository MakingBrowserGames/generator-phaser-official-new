'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var PhaserGenerator = yeoman.generators.Base.extend({
  init: function() {
    this.pkg = require('../package.json');

    this.on('end', function() {
      if (!this.options['skip-install']) {
        this.installDependencies({
          bower: false,
          npm: true
        });
      }
    });
  },

  askFor: function() {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Phaser generator.'));

    var prompts = [{
        name: 'projectName',
        message: 'What is the name of your project?',
        default: 'phaser-game'
      },
      {
        name: 'phaserOfficial',
        message: 'Do you want to use Phaser offical, instead of Phaser CE? (yes/no)',
        default: 'yes'
      },
      {
        name: 'phaserVersion',
        message: 'Which Phaser version would you like to use?',
        default: '2.6.2'
      },
      {
        name: 'gameWidth',
        message: 'Game Display Width',
        default: 640
      },
      {
        name: 'gameHeight',
        message: 'Game Display Height',
        default: 832
      }
    ];

    this.prompt(prompts, function(props) {
      this.projectName = props.projectName
      this.phaserOfficial = props.phaserOfficial
      this.phaserVersion = props.phaserVersion;
      this.gameHeight = props.gameHeight;
      this.gameWidth = props.gameWidth;

      done();
    }.bind(this));
  },



  app: function() {
    // base files
    this.template('Gruntfile.js', 'Gruntfile.js');

    if (this.phaserOfficial == 'yes') {
      this.template('_package.json', 'package.json');
    }
    else {
      this.template('_package-ce.json', 'package.json');
    }
    this.template('_config.json', 'config.json');
    // this.template('_package.json', 'package.json');

    // HTML and CSS
    this.template('css/_styles.css', 'css/styles.css');
    this.template('_index.html', 'index.html');

    // JS game files
    this.copy('game/states/boot.js');
    this.copy('game/states/preload.js');
    this.copy('game/states/menu.js');
    this.copy('game/states/play.js');
    this.copy('game/states/gameover.js');
    this.copy('templates/_main.js.tpl');

    // Assets files
    this.copy('assets/LoadingBar_Outer.png');
    this.copy('assets/LoadingBar_Inner.png');
    this.copy('assets/yeoman-logo.png');
    this.copy('assets/graphics/rotate-phone.png');
    this.copy('assets/fonts/GrilledCheeseBTNToasted.woff');
    this.copy('assets/fonts/font.png');
    this.copy('assets/fonts/font.fnt');


  },
  createBootstrapper: function() {
    var stateFiles = this.expand('game/states/*.js');
    this.gameStates = [];
    var statePattern = new RegExp(/(\w+).js$/);
    stateFiles.forEach(function(file) {
      var state = file.match(statePattern)[1];
      if (!!state) {
        this.gameStates.push({ shortName: state, stateName: this._.capitalize(state) + 'State' });
      }
    }, this);

    this.template('game/_main.js', 'game/main.js');
  },
  runtime: function() {
    this.copy('gitignore', '.gitignore');


  },
  projectfiles: function() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = PhaserGenerator;
