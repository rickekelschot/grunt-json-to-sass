# grunt-json-to-sass

> Convert JSON files to SASS files

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```bash
$ npm install grunt-json-to-sass --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-json-to-sass');
```

## The "json_to_sass" task

### Config
In your project's Gruntfile, add a section named `json_to_sass` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  json_to_sass: {
    your_target: {
      files: [
        {
          src: [
            'example.json'
          ],
          dest: '_example.scss'
        }
      ]
    },
  },
});
```

## Supported conversions
1. Objects to maps
1. RGB(A) & HSL
1. Interpolation (\#{})


