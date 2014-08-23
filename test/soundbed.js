var test = require('tape'),
    SoundBed, obj;

function beforeTest() {

}

test('load SoundBed.', function(t) {
  SoundBed = require('../src/soundbed');
  t.ok(SoundBed, 'object loaded');
  t.end();
});

