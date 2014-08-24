// Flora classes
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var SoundBed = {
  Player: require('./src/player'),
  Gain: require('./src/gain')
};

module.exports = SoundBed;
