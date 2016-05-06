/*global module, require*/
module.exports = (function markupParser() {
    'use strict';

    var cheerio = require("cheerio"), //Dependencies
        parse, generateData, //Functions
        $, data; //Variables

    parse = function parse(htmlDocument) {
        $ = cheerio.load(htmlDocument);
        data = {};
        data.moves = generateData();
        return data;
    };

    generateData = function generateData() {
        var moves = [],
            headings = ['notation', 'hit_level', 'damage', 'speed', 'on_block', 'on_hit', 'on_ch', 'notes'];

        //Converting table to an array of moves
        $('tr').each(function (i) {
            var move;
            //Not including first row as it's a heading
            if (i !== 0) {
                move = {};
                $(this).children().each(function (i, elem) {
                    var value = null;
                    if ($(elem).text().trim()) {
                        value = $(elem).text().trim();
                    }
                    move[headings[i]] = value;
                });
                moves.push(move);

            }
        });
        return moves;

    };

    return {
        parse: parse
    };

}());
