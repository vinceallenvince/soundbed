var test = require('tape'),
    Context,
    Oscillator, obj;

function beforeTest() {
  Context = {
    createGainNode: function() {
      return {
        gain: {
          value: 0
        }
      };
    }
  };
}

test('load Oscillator.', function(t) {
  Oscillator = require('../src/oscillator.js');
  t.ok(Oscillator, 'object loaded');
  t.end();
});