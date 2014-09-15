var test = require('tape'),
    Context,
    Player, obj;

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

test('load Player.', function(t) {
  // TODO: fix
  /*t.throws(function() {
    Player = require('../src/player.js');
  });*/
  t.end();
});