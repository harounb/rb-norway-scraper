/*global module, require*/
module.exports = (function scraper() {
    'use strict';

    var cheerio = require("cheerio"), //Dependencies
        init, getData, generateData, //Functions
        $, data; //Variables

    init = function init(htmlDocument) {
        $ = cheerio.load(htmlDocument);
        data = {};
        data.moves = generateData();

    };

    generateData = function generateData() {
        var moves = [],
            headings = ['notation', 'hit_level', 'damage', 'speed', 'on_block', 'on_hit', 'on_ch'];

        //Converting table to an array of moves
        $('tr').each(function (i) {
            if (i !== 0) { //Not including first row as it's a heading
                var move = {};
                $(this).children().each(function (i, elem) {
                    move[headings[i]] = $(elem).text();
                });
                moves.push(move);

            }
        });
        return moves;

    };

    getData = function getData() {
        return data;

    };

    return {
        init: init,
        getData: getData

    };

}());
