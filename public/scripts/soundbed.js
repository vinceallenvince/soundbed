!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.SoundBed=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
// Flora classes
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var SoundBed = {
  Player: _dereq_('./src/player')
};

module.exports = SoundBed;

},{"./src/player":8}],2:[function(_dereq_,module,exports){
/*jshint supernew:true */
/** @namespace */
var Utils = {
  name: 'Utils'
};

/**
 * Extends the properties and methods of a superClass onto a subClass.
 *
 * @function extend
 * @memberof Utils
 * @param {Object} subClass The subClass.
 * @param {Object} superClass The superClass.
 */
Utils.extend = function(subClass, superClass) {
  function F() {}
  F.prototype = superClass.prototype;
  subClass.prototype = new F;
  subClass.prototype.constructor = subClass;
  subClass._superClass = superClass.prototype;
};

/**
 * Generates a psuedo-random number within a range.
 *
 * @function getRandomNumber
 * @memberof Utils
 * @param {number} low The low end of the range.
 * @param {number} high The high end of the range.
 * @param {boolean} [flt] Set to true to return a float.
 * @returns {number} A number.
 */
Utils.getRandomNumber = function(low, high, flt) {
  if (flt) {
    return Math.random()*(high-(low-1)) + low;
  }
  return Math.floor(Math.random()*(high-(low-1))) + low;
};

/**
 * Re-maps a number from one range to another.
 *
 * @function map
 * @memberof Utils
 * @param {number} value The value to be converted.
 * @param {number} min1 Lower bound of the value's current range.
 * @param {number} max1 Upper bound of the value's current range.
 * @param {number} min2 Lower bound of the value's target range.
 * @param {number} max2 Upper bound of the value's target range.
 * @returns {number} A number.
 */
Utils.map = function(value, min1, max1, min2, max2) { // returns a new value relative to a new range
  var unitratio = (value - min1) / (max1 - min1);
  return (unitratio * (max2 - min2)) + min2;
};

/**
 * Adds an event listener to a DOM element.
 *
 * @function _addEvent
 * @memberof System
 * @private
 * @param {Object} target The element to receive the event listener.
 * @param {string} eventType The event type.
 * @param {function} The function to run when the event is triggered.
 */
Utils.addEvent = function(target, eventType, handler) {
  if (target.addEventListener) { // W3C
    target.addEventListener(eventType, handler, false);
  } else if (target.attachEvent) { // IE
    target.attachEvent('on' + eventType, handler);
  }
};

/**
 * Converts degrees to radians.
 *
 * @function degreesToRadians
 * @memberof Utils
 * @param {number} degrees The degrees value to be converted.
 * @returns {number} A number in radians.
 */
Utils.degreesToRadians = function(degrees) {
  if (typeof degrees !== 'undefined') {
    return 2 * Math.PI * (degrees/360);
  } else {
    if (typeof console !== 'undefined') {
      throw new Error('Error: Utils.degreesToRadians is missing degrees param.');
    }
  }
};

/**
 * Converts radians to degrees.
 *
 * @function radiansToDegrees
 * @memberof Utils
 * @param {number} radians The radians value to be converted.
 * @returns {number} A number in degrees.
 */
Utils.radiansToDegrees = function(radians) {
  if (typeof radians !== 'undefined') {
    return radians * (180/Math.PI);
  } else {
    if (typeof console !== 'undefined') {
      throw new Error('Error: Utils.radiansToDegrees is missing radians param.');
    }
  }
};

/**
 * Constrain a value within a range.
 *
 * @function constrain
 * @memberof Utils
 * @param {number} val The value to constrain.
 * @param {number} low The lower bound of the range.
 * @param {number} high The upper bound of the range.
 * @returns {number} A number.
 */
Utils.constrain = function(val, low, high) {
  if (val > high) {
    return high;
  } else if (val < low) {
    return low;
  }
  return val;
};

/**
 * Determines if one object is inside another.
 *
 * @function isInside
 * @memberof Utils
 * @param {Object} obj The object.
 * @param {Object} container The containing object.
 * @returns {boolean} Returns true if the object is inside the container.
 */
Utils.isInside = function(obj, container) {
  if (!obj || !container) {
    throw new Error('isInside() requires both an object and a container.');
  }

  obj.width = obj.width || 0;
  obj.height = obj.height || 0;
  container.width = container.width || 0;
  container.height = container.height || 0;

  if (obj.location.x + obj.width / 2 > container.location.x - container.width / 2 &&
    obj.location.x - obj.width / 2 < container.location.x + container.width / 2 &&
    obj.location.y + obj.height / 2 > container.location.y - container.height / 2 &&
    obj.location.y - obj.height / 2 < container.location.y + container.height / 2) {
    return true;
  }
  return false;
};

/**
 * Capitalizes the first character in a string.
 *
 * @function capitalizeFirstLetter
 * @memberof Utils
 * @param {string} string The string to capitalize.
 * @returns {string} The string with the first character capitalized.
 */
Utils.capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = Utils;
},{}],3:[function(_dereq_,module,exports){
/*jshint bitwise:false */
/**
* https://gist.github.com/304522
* Ported from Stefan Gustavson's java implementation
* http://staffwww.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf
* Read Stefan's excellent paper for details on how this code works.
*
* @author Sean McCullough banksean@gmail.com
*
* You can pass in a random number generator object if you like.
* It is assumed to have a random() method.
*/

/**
 * @namespace
 */

var SimplexNoise = {};

SimplexNoise.grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
SimplexNoise.p = [];
SimplexNoise.perm = [];
// A lookup table to traverse the simplex around a given point in 4D.
// Details can be found where this table is used, in the 4D noise method.
SimplexNoise.simplex = [
  [0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],
  [0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],
  [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
  [1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],
  [1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],
  [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
  [2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],
  [2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]];

SimplexNoise.config = function(r) {

  var i, p = SimplexNoise.p, perm = SimplexNoise.perm;

  if (typeof r === 'undefined') {
    r = Math;
  }

  for (i = 0; i < 256; i += 1) {
    SimplexNoise.p[i] = Math.floor(r.random() * 256);
  }
  // To remove the need for index wrapping, double the permutation table length
  for(i = 0; i < 512; i += 1) {
    perm[i] = p[i & 255];
  }
};

SimplexNoise.noise = function(xin, yin) {

  var grad3 = SimplexNoise.grad3;
  var p = SimplexNoise.p;
  var perm = SimplexNoise.perm;
  var simplex = SimplexNoise.simplex;

  if (!p.length) {
    SimplexNoise.config();
  }

  var n0, n1, n2; // Noise contributions from the three corners

  // Skew the input space to determine which simplex cell we're in
  var F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
  var s = (xin + yin) * F2; // Hairy factor for 2D
  var i = Math.floor(xin + s);
  var j = Math.floor(yin + s);
  var G2 = (3.0 -Math.sqrt(3.0)) / 6.0;
  var t = (i + j) * G2;
  var X0 = i - t; // Unskew the cell origin back to (x,y) space
  var Y0 = j - t;
  var x0 = xin - X0; // The x,y distances from the cell origin
  var y0 = yin - Y0;

  // For the 2D case, the simplex shape is an equilateral triangle.
  // Determine which simplex we are in.
  var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
  if (x0 > y0) { i1 = 1; j1 = 0; } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
  else { i1 = 0; j1 = 1; }      // upper triangle, YX order: (0,0)->(0,1)->(1,1)
  // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
  // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
  // c = (3-sqrt(3))/6
  var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
  var y1 = y0 - j1 + G2;
  var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
  var y2 = y0 - 1.0 + 2.0 * G2;

  // Work out the hashed gradient indices of the three simplex corners
  var ii = i & 255;
  var jj = j & 255;
  var gi0 = this.perm[ii + this.perm[jj]] % 12;
  var gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12;
  var gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12;

  // Calculate the contribution from the three corners
  var t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 < 0) {
    n0 = 0.0;
  } else {
    t0 *= t0;
    n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);  // (x,y) of grad3 used for 2D gradient
  }
  var t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 < 0) {
    n1 = 0.0;
  } else {
    t1 *= t1;
    n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1);
  }
  var t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 < 0) {
    n2 = 0.0;
  } else {
    t2 *= t2;
    n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2);
  }
  // Add contributions from each corner to get the final noise value.
  // The result is scaled to return values in the interval [-1,1].
  return 70.0 * (n0 + n1 + n2);

};

SimplexNoise.dot = function(g, x, y) {
  return g[0] * x + g[1] * y;
};

module.exports = SimplexNoise;

},{}],4:[function(_dereq_,module,exports){
/**
 * Creates a Convolver.
 * @param {Object} context A Web Audio context.
 * @param {Object} [opt_options=] A map of initial properties.
 * @constructor
 */
function Convolver(context, opt_options) {
  var options = opt_options || {};
  this.context = context;
  this.node = context.createConvolver();
  this.node.normalize = true;
}

/**
 * Sets the type of Convolver effect.
 * @param {number} type Sets the reverb level.
 * @example
 * 0 - none
 * 1 - inverse
 * 2 - small
 * 3 - medium
 * 4 - large
 * 5 - huge
 */
Convolver.prototype.setEffect = function(type) {

  var noiseBuffer;

  switch (type) {
    case 1:
      noiseBuffer = this.context.createBuffer(2, 0.01 * this.context.sampleRate,
          this.context.sampleRate);
      break;

    case 2:
      noiseBuffer = this.context.createBuffer(2, 1 * this.context.sampleRate,
          this.context.sampleRate);
      break;

    case 3:
      noiseBuffer = this.context.createBuffer(2, 3 * this.context.sampleRate,
          this.context.sampleRate);
      break;

    case 4:
      noiseBuffer = this.context.createBuffer(2, 6 * this.context.sampleRate,
          this.context.sampleRate);
      break;

    case 5:
      noiseBuffer = this.context.createBuffer(2, 12 * this.context.sampleRate,
          this.context.sampleRate);
      break;
    default:
      this.node.buffer = null;
      return;
  }

  var left = noiseBuffer.getChannelData(0),
      right = noiseBuffer.getChannelData(1);

  for (var i = 0, max = noiseBuffer.length; i < max; i++) {
    left[i] = Math.random() * 2 - 1;
    right[i] = Math.random() * 2 - 1;
  }

  this.node.buffer = noiseBuffer;
};

module.exports = Convolver;

},{}],5:[function(_dereq_,module,exports){
/**
 * Creates a Delay.
 * @param {Object} context A Web Audio context.
 * @param {Object} [opt_options=] A map of initial properties.
 * @constructor
 */
function Delay(context, opt_options) {
  var options = opt_options || {};
  this.node = context.createDelay();
}

/**
 * Sets the delay's delay time.
 * @param {number} val The delay time.
 */
Delay.prototype.setDelay = function(val) {
  this.node.delayTime.value = val;
};

module.exports = Delay;
},{}],6:[function(_dereq_,module,exports){
/**
 * Creates a Gain. Use to control player volume.
 * @param {Object} context A Web Audio context.
 * @param {Object} [opt_options=] A map of initial properties.
 * @param {number} [opt_options.value = 0.1] The gain's initial value.
 * @constructor
 */
function Gain(context, opt_options) {
  var options = opt_options || {};
  this.node = context.createGain();
  this.node.gain.value = options.value === 'undefined' ? 0.1 : options.value;
}

/**
 * Changes the gain.
 * @param {number} val The gain.
 */
Gain.prototype.changeGain = function(val) {
  this.node.gain.value = val;
};

module.exports = Gain;
},{}],7:[function(_dereq_,module,exports){
/*jshint -W030 */

/**
 * Creates a BiquadFilter.
 * @param {Object} context A Web Audio context.
 * @param {Object} [opt_options=] A map of initial properties.
 * @param {number} [opt_options.type = 'sine'] The oscillator's shape.
 * @param {number} [opt_options.frequency = 400] Frequency.
 * @constructor
 */
function Oscillator(context, opt_options) {
  var options = opt_options || {};
  this.node = context.createOscillator();
  this.node.type = options.type || 'sine';
  this.node.frequency.value = options.frequency !== 'undefined' ? options.frequency : 150;
  this._isPlaying = false;
}

/**
 * Plays an oscillator.
 */
Oscillator.prototype.play = function() {
  this.node.start(0);
};

/**
 * Stops an oscillator.
 */
Oscillator.prototype.stop = function() {
  this.node.stop(0);
};

/**
 * Toggles an oscillator between playing and stopping.
 */
Oscillator.prototype.toggle = function() {
  (this._isPlaying ? this.stop() : this.play());
  this._isPlaying = !this._isPlaying;
};

/**
 * Changes the filter's frequency.
 * @param {number} val The frequency.
 */
Oscillator.prototype.changeFrequency = function(val) {
  this.node.frequency.value = val;
};

module.exports = Oscillator;
},{}],8:[function(_dereq_,module,exports){
/*jshint -W056 */

var Convolver = _dereq_('./convolver'),
    Delay = _dereq_('./delay'),
    Gain = _dereq_('./gain'),
    Oscillator = _dereq_('./oscillator'),
    SimplexNoise = _dereq_('quietriot'),
    Utils = _dereq_('drawing-utils-lib');

/**
 * Creates a Player.
 * @constructor
 */
function Player() {
  this.name = 'Player';
  this.gain = null;
  this.oscA = null;
  this.oscB = null;
  this.convolver = null;
  this.delay = null;
  this.clock = 0;
}

Player.audio_context = null;

/**
 * Configures an audio context.
 * @param {Object} [opt_options=] A map of initial properties.
 * @param {number} [opt_options.reverb = 4] Reverb level.
 */
Player.prototype.init = function(opt_options) {

  var options = opt_options || {};
  var audio_context = Player.audio_context;

  this.perlin = typeof options.perlin !== 'undefined' ? options.perlin : true;
  this.reverb = typeof options.reverb !== 'undefined' ? options.reverb : 4;
  this.delay = options.delay || 0;
  this.oscAFreq = typeof options.oscAFreq !== 'undefined' ? options.oscAFreq : 150;
  this.oscBFreq = typeof options.oscBFreq !== 'undefined' ? options.oscBFreq : 200;
  this.oscARate = typeof options.oscARate !== 'undefined' ? options.oscARate : 0.001;
  this.oscBRate = typeof options.oscBRate !== 'undefined' ? options.oscBRate : -0.001;
  this.freqMin = typeof options.freqMin !== 'undefined' ? options.freqMin : 150;
  this.freqMax = typeof options.freqMax !== 'undefined' ? options.freqMax : 200;
  this.volume = typeof options.volume !== 'undefined' ? options.volume : 0.25;
  this.volumeMin = typeof options.volumeMin !== 'undefined' ? options.volumeMin : 0.1;
  this.volumeMax = typeof options.volumeMax !== 'undefined' ? options.volumeMax : 0.25;

  this.gain = new Gain(audio_context);
  this.oscA = new Oscillator(audio_context);
  this.oscB = new Oscillator(audio_context);
  this.convolver = new Convolver(audio_context);
  this.delay = new Delay(audio_context);

  this.oscA.toggle();
  this.oscB.toggle();
  this.convolver.setEffect(this.reverb);
  this.delay.setDelay(this.delay);
  this.gain.changeGain(this.volume);
  this.oscA.changeFrequency(this.oscAFreq);
  this.oscB.changeFrequency(this.oscBFreq);

  this.configure(audio_context);

  if (this.perlin) {
    this.loop();
  }
};

/**
 * Sets audio node configuration.
 * @param  {Object} context A Web Audio object.
 */
Player.prototype.configure = function(context) {
  this._connect(this.gain.node, context.destination);
  this._connect(this.delay.node, this.gain.node);
  this._connect(this.convolver.node, this.delay.node);
  this._connect(this.oscA.node, this.convolver.node);
  this._connect(this.oscB.node, this.convolver.node);
};

/**
 * Connects audio nodes.
 * @param  {Object} nodeA A Web Audio node.
 * @param  {Object} nodeB A Web Audio node.
 */
Player.prototype._connect = function(nodeA, nodeB) {
  nodeA.connect(nodeB);
};

/**
 * Updates audio node properties.
 */
Player.prototype.loop = function() {

  var valA = Utils.map(SimplexNoise.noise(this.clock * this.oscARate, 0),
    -1, 1, this.freqMin, this.freqMax);

  this.oscA.changeFrequency(valA);

  var valB = Utils.map(SimplexNoise.noise(this.clock * this.oscBRate, 0),
    -1, 1, this.freqMin, this.freqMax);

  var volume = Utils.map(SimplexNoise.noise(this.clock * this.oscARate, 0),
    -1, 1, this.volumeMin, this.volumeMax);

  this.oscB.changeFrequency(valB);
  this.gain.changeGain(volume);

  this.clock++;

  if (typeof window.requestAnimationFrame !== 'undefined') {
    window.requestAnimationFrame(this.loop.bind(this));
  }
};

(function init(g){
  try {
    Player.audio_context = new (g.AudioContext || g.webkitAudioContext);
  } catch (e) {
    throw new Error('No web audio support in this browser');
  }
}(window));

module.exports = Player;

},{"./convolver":4,"./delay":5,"./gain":6,"./oscillator":7,"drawing-utils-lib":2,"quietriot":3}]},{},[1])
(1)
});