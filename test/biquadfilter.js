var test = require('tape'),
    Context,
    BiquadFilter, obj;

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

test('load BiquadFilter.', function(t) {
  BiquadFilter = require('../src/biquadfilter.js');
  t.ok(BiquadFilter, 'object loaded');
  t.end();
});
