/*
 * grunt-envtojson
 * https://github.com/antiBaconMachine/grunt-envtojson
 *
 * Copyright (c) 2014 Ollie Edwards
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var path = require('path');
    var _ = require('lodash');
    var options;

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('envtojson', 'Update json file with environment variable values', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        options = this.options({
            vars: {},
            assignToVar: false,
            whiteSpace: 4
        });

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                // Read file source.
                var modulePath = path.resolve(filepath);
                var js = _.clone(require(modulePath), true);
                writeFile(f.dest, JSON.stringify(updateValues(js, options.vars), null, (options.whiteSpace)), options.assignToVar);
            });
        });
    });

    var updateValues = function (js, vars) {
        _.each(vars, function (replace, key) {
            var val = process.env[key];
            if (val) {
                val = typeSafe(val);
                var keyPath, cb;
                if (typeof replace === 'string') {
                    keyPath = replace;
                    cb = function(newV, oldV) {
                        return newV;
                    };
                } else {
                    keyPath = replace.key;
                    cb = replace.callback;
                }
                js = updateValue(js, keyPath.split('.'), _.bind(cb, this, val)) || js;
            }
        });
        return js;
    };

    var updateValue = function (object, segments, cb) {
        if (object && segments.length) {
            var segment = segments.shift();
            if (segments.length === 0) {
                object[segment] = cb(object[segment]);
                return object;
            } else {
                object[segment] = updateValue((object[segment] || {}), segments, cb);
                return object;
            }
        }
    };

    var writeFile = function(dest, content, assignToVar) {
        if (assignToVar) {
            content = _.template("<%=assignToVar%>=<%=content%>;")({
                content: content,
                assignToVar: assignToVar
            });
        }
        grunt.file.write(dest, content);
    };

    var typeSafe = function(val) {
        if (val) {
            var asFloat = parseFloat(val);
            if (!isNaN(asFloat)) {
                return asFloat;
            }
            var aslowerCase = val.toLowerCase();
            if (aslowerCase === 'true') {
                return true;
            } else if (aslowerCase === 'false') {
                return false;
            }
        }
        return val;
    };

};
