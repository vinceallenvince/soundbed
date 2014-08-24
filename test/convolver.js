var test = require('tape'),
    Context,
    Convolver, obj;

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

test('load Convolver.', function(t) {
  Convolver = require('../src/convolver.js');
  t.ok(Convolver, 'object loaded');
  t.end();
});
