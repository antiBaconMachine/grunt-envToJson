/*
 * grunt-envToJson
 * https://github.com/antiBaconMachine/grunt-envToJson
 *
 * Copyright (c) 2014 Ollie Edwards
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var path = require('path');
    var _ = require('lodash');

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('envToJson', 'Update json file with environment variable values', function () {
        console.log("running %s", this.name);
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            vars: {}
        });

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else  {
                    return true;
                }
            }).map(function (filepath) {
                // Read file source.
                var modulePath = path.resolve(filepath);
                console.log('requiring %s', modulePath);
                var js = require(modulePath);
                grunt.file.write(f.dest, JSON.stringify(updateValues(js, options.vars)));
                grunt.log.writeln('File "' + f.dest + '" created.');
            });
        });
    });

    var updateValues = function(js, vars) {
        console.log("update object with ", vars);
        _.each(vars, function(path, key) {
            var val = process.env[key];
            if (val) {
                js = updateValue(js, path.split('.'), val) || js;
            }
        });
        return js;
    };

    var updateValue = function(object, segments, val) {
        if (segments.length) {
            var segment = segments.shift();
            if (segments.length === 0) {
                object[segment] = val;
                return object;
            } else {
                if (!_.has(object, segment)) {
                    object[segment] = {};
                }
                object[segment] = updateValue(object[segment], segments, val);
                return object;
            }
        }
    };

};
