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

        // Configuration to be run (and then tested).
        envToJson: {
            options: {
                vars: {
                    POLLING_ENDPOINT: "polling.apiEndpoint",
                    FOO_BAR: 'foo.bar.baz.spam.eggs.wibble'
                }
            },
            appConfig: {
                files: {
                    '../www/scripts/config.js': ['src/scripts/config.js']
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
    grunt.registerTask('test', ['clean', 'envToJson', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint']);

};
