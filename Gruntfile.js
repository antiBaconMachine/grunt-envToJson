/*
 * grunt-envToJson
 * https://github.com/antiBaconMachine/grunt-envToJson
 *
 * Copyright (c) 2014 Ollie Edwards
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        env: {
            default: {
                FOO_BAR: 'altered',
                PYTHONESQUE: 'altered',
                DRINK_BEER: 'altered',
                DYNAMIC_PROP: 'newProp'
            }
        },

        // Configuration to be run (and then tested).
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
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        },

        bump: {
            options: {
                pushTo: 'origin'
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    require('load-grunt-tasks')(grunt);

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['env:default', 'clean', 'envToJson', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
