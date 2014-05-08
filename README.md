# grunt-envtojson

> Update a json object file with environment variable values.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-envtojson --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-envtojson');
```

## The "envtojson" task

### Overview
In your project's Gruntfile, add a section named `envtojson` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  envtojson: {
    options: {
      vars: {
        ENV_VAR: "object.path.to.alter"
      }
    },
    your_target: {
      files: {
        'dest.js': ['src.js']
      }
    },
  },
});
```

### Options

#### options.vars
Type: `Object`
Default value: `{}`
Description Map of environment variables to the json keys they should be injected into

### options.assignToVar
Type: `String`
Default value: 'module.exports'
Description Assign the output to this var. Pass a falsy value to just get the json;

### options.whiteSpace
Type `Int`
Default value: 4
Description passed as the 3rd arg to JSON.stringify when writing out the object;

Map of environment vars to config keys.

### Usage Examples

input
```js
module.exports = {
    foo: {
        bar: 'howdy'
    },
    spam: {
        eggs: {
            parrot: "grail"
        }
    },
    beer: "good"
}
```

grunt
```js
envtojson: {
    options: {
        vars: {
            FOO_BAR: "foo.bar",
            PYTHONESQUE: 'spam.eggs.parrot',
            DRINK_BEER: 'beer',
            DYNAMIC_PROP: 'one.hundred.stones'
        }
        whiteSpace: 0
    },
    default: {
        files: {
            'test/out/default.js': ['test/fixtures/default.js']
        }
    }
}
```

output
```js
module.exports={"foo":{"bar":"altered"},"spam":{"eggs":{"parrot":"altered"}},"beer":"altered","one":{"hundred":{"stones":"newProp"}}};
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
