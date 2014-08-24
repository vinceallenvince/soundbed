var test = require('tape'),
    Context,
    Gain, obj;

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

test('load Gain.', function(t) {
  Gain = require('../src/gain.js');
  t.ok(Gain, 'object loaded');
  t.end();
});
