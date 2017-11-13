'use strict';

//global variables
var <%= _.pluck(gameStates,'stateName').join(', ') %>, game;
window.onload = function() {
  game = new Phaser.Game(<%= gameWidth %>, <%= gameHeight %>, Phaser.AUTO, '<%= _.slugify(projectName) %>');

  // Is the game running under Apache Cordova Phonegap?
  // Is the it Android Native Browser?
  function isAndroidBrowser() {
    var objAgent = navigator.userAgent;
    var objfullVersion = '' + parseFloat(navigator.appVersion);
    var objOffsetVersion = objAgent.indexOf("Chrome");
    if (objOffsetVersion != -1) {
      objfullVersion = objAgent.substring(objOffsetVersion + 7, objOffsetVersion + 9);
      if (objfullVersion < 19) {
        return true;
      }
    }
    return false;
  }
  var inAppBrowser = isAndroidBrowser();
  // Is Android OS older than 4.3?
  function getAndroidVersion(ua) {
    ua = (ua || navigator.userAgent).toLowerCase();
    var match = ua.match(/android\s([0-9\.]*)/);
    return match ? match[1] : false;
  };
  // getAndroidVersion(); // "4.2.1"
  // parseInt(getAndroidVersion()); // 4
  var andoidVersion = parseFloat(getAndroidVersion()); // 4.2
  if (andoidVersion < 4.3) {
    var oldAndroid = true
  }
  else {
    var oldAndroid = false
  }
  // Global variables
  // call them: this.game.global.phonegap
  game.global = {
    levels_num: 28,
    phonegap: inAppBrowser,
    old_android: oldAndroid,
    enable_sound: !inAppBrowser

  };


  // Game States
  <% _.forEach(gameStates, function(gameState) {  %>
  game.state.add('<%= gameState.shortName %>', <%= gameState.stateName %>);
  <% }); %>

  game.state.start('boot');
};