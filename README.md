![Build status](https://travis-ci.org/vinceallenvince/soundbed.svg?branch=master)

# soundbed

An ambient audio generator.

Use SoundBed to generate audio for animation, simulations or general ambient effects in a web browser. The module uses the [Web Audo API](http://webaudio.github.io/web-audio-api/) and by default will generate a low volume hum that naturally varies in frequency. Use the options below for different configurations. Your browser [must support](http://caniuse.com/#feat=audio-api) the Web Audio API.

##Install

To include soundbed as a component in your project, use the node module.

```
npm install soundbed --save
```

You can also use the [standalone version](https://github.com/vinceallenvince/soundbed/releases/latest) and reference the js file from your document.

```
<html>
  <head>
    <script src="scripts/soundbed.min.js" type="text/javascript" charset="utf-8"></script>
  </head>
  ...
```

##Usage

The module exports a SoundBed class. In a nodejs project, you access it via:

```
var SoundBed = require('../src/soundbed');
var soundbed = new SoundBed();
```

In the browser, the SoundBed namespace is exposed.

```
<html>
  <head>
    <script src="scripts/soundbed.min.js" type="text/javascript" charset="utf-8"></script>
  </head>
  <body>
    <script>
      var player = new SoundBed.Player();
      player.init({
        oscAFreq: 60,
        oscBFreq: 120,
        oscARate: 0.01,
        oscBRate: -0.01,
        freqMin: 60,
        freqMax: 120,
        volumeMin: 0.1,
        volumeMax: 1
      });
    </script>
  </body>
</html>
```

##Configure

By default, a SoundBed player creates two Web Audio [Oscillator](http://webaudio.github.io/web-audio-api/#the-oscillatornode-interface) nodes and cycles their frequencies in opposite directions inside an [RequestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame) loop. Each frame it maps [Perlin noise](http://en.wikipedia.org/wiki/Perlin_noise) to a minimum/maximum range to determine the frequency.

You can pass the following options when initializing a Player.

 *    perlin  (default = true)
      Set to true chnage the oscillators' frequency via Perlin noise.

 *    reverb
      Reverb level. Valid values are 0 - 5 and map to the following:
      0 - none
      1 - inverse
      2 - small
      3 - medium
      4 - large
      5 - huge


 *    delayTime (default = 0)
      Delay time.

 *    oscAFreq (default = 150)
      Oscillator A's initial frequency.

 *    oscBFreq (default = 200)
      Oscillator B's initial frequency.

 *    oscARate (default = 0.001)
      Oscillator A's cycle rate through its frequency's min/max.

 *    oscBRate (default = -0.001)
      Oscillator B's cycle rate through its frequency's min/max.

 *    freqMin (default = 150)
      The oscillators' minimum frequency.

 *    freqMax (default = 200)
      The oscillators' maximum frequency.

 *    volume (default = 0.25)
      The player's initial volume. Valid values between 0 and 1.

 *    volumeMin (default = 0.1)
      The player's minimum volume. Valid values between 0 and 1.

 *    volumeMax (default = 0.25)
      The player's maximum volume. Valid values between 0 and 1.


Please review [the docs](http://vinceallenvince.github.io/soundbed/doc/) or check out the [examples](http://vinceallenvince.github.io/soundbed/).

##Building this project

This project uses [Grunt](http://gruntjs.com). To build the project first install the node modules.

```
npm install
```

Next, run grunt.

```
grunt
```

To run the tests, run 'npm test'.

```
npm test
```

To check test coverage run 'grunt coverage'.

```
grunt coverage
```

A pre-commit hook is defined in /pre-commit that runs jshint. To use the hook, run the following:

```
ln -s ../../pre-commit .git/hooks/pre-commit
```

A post-commit hook is defined in /post-commit that runs the Plato complexity analysis tools. To use the hook, run the following:

```
ln -s ../../post-commit .git/hooks/post-commit
```

View the [code complexity](http://vinceallenvince.github.io/soundbed/reports/) report.
