# grunt-envToJson

> Update a json object file with environment variable values.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-envToJson --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-envToJson');
```

## The "envToJson" task

### Overview
In your project's Gruntfile, add a section named `envToJson` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  envToJson: {
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
envToJson: {
    options: {
        vars: {
            FOO_BAR: "foo.bar",
            PYTHONESQUE: 'spam.eggs.parrot',
            DRINK_BEER: 'beer',
            DYNAMIC_PROP: 'one.hundred.stones'
        }
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
{"foo":{"bar":"altered"},"spam":{"eggs":{"parrot":"altered"}},"beer":"altered","one":{"hundred":{"stones":"newProp"}}}
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
