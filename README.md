![Build status](https://travis-ci.org/vinceallenvince/soundbed.svg?branch=master)

# soundbed

This is a work in progress.

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
