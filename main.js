// Flora classes
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var SoundBed = {
  Player: require('./src/player')
};

module.exports = SoundBed;
