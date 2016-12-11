/*
 * grunt-json-to-sass
 * https://github.com/rickekelschot/grunt-json-to-sass
 *
 * Copyright (c) 2015 Rick Ekelschot
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask('json_to_sass', 'Convert JSON files to SASS files', function () {
        this.files.map(function (file) {
            return {
                src: file.src.filter(function (fileSrc) {
                    if (!grunt.file.exists(fileSrc)) {
                        grunt.log.warn('Source file "' + fileSrc + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                }),
                dest: file.dest
            }
        }).map(function (file) {
            return {
                src: file.src.map(function (path) {
                    return parseJSON(path, grunt.file.read(path))
                }).join('\n'),
                dest: file.dest
            };
        }).forEach(function (file) {
            grunt.file.write(file.dest, file.src);
            grunt.log.writeln('File "' + file.dest + '" created.');
        });
    });
};


var parseJSON = function (path, src) {
        var json = JSON.parse(src),
            maps = [];

        Object.keys(json).forEach(function (map) {
            maps.push(createSassMap(map, json[map]));
        });

        return maps.join('\n');
    },

    createSassMap = function (name, obj) {
        var map = '$' + name + ':',
            json = JSON.stringify(obj),
            unQuote = /"([a-z0-9-#]+)"/g,
            openingCurlyBrace = /((?!#).{1}|^.{0}){/g,
            openingBlockQuote = /\[/g,
            closingCurlyBrace = /}(?=,|$|\n|})/g,
            closingBlockQoute = /\]/g;

        map += json
            .replace(unQuote, '$1')
            .replace(openingCurlyBrace, '$1(')
            .replace(openingBlockQuote, '(')
            .replace(closingCurlyBrace, ')')
            .replace(closingBlockQoute, ')');

        map = fixColors(map);
        map = fixSassStrings(map);
        map += ';';

        if(map.match(/"([0-9a-zA-Z#(),.]+)( !)([a-z]+)"/)){
          map = map.replace(/(")/g, '');
        }

        return map;
    },

    fixColors = function (value) {
        var mixinColors = new RegExp(/\"(rgb.+?|hsl.+?)\"/g),
            hexColors = new RegExp(/\"(#[0-9a-fA-F]{3,6})\"/g);

        return value.replace(mixinColors, "$1")
            .replace(hexColors, "$1");
    },

    fixSassStrings = function (value) {
        return value.replace(/\"(#{)\\(")(\(.+\))\\(")(\})\"/g, '$1$2$3$4$5');
    };
