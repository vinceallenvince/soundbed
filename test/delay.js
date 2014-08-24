var test = require('tape'),
    Context,
    Delay, obj;

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

test('load Delay.', function(t) {
  Delay = require('../src/delay.js');
  t.ok(Delay, 'object loaded');
  t.end();
});