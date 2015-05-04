/*global module, require*/
module.exports = (function markupParser() {
  'use strict';

  var cheerio = require("cheerio"), //Dependencies
    parse, generateData, //Functions
    $, data; //Variables

  parse = function parse(htmlDocument) {
    $ = cheerio.load(htmlDocument);
    data = {};
    //Implementing version 0.3 of the tekken feed format
    data.metadata = {
      ver: "0.3",
      game: "ttt2/t7",
      character: "hwoarang",
      type: "basic/regular"
    };
    data.moves = generateData();
    return data;
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

  return {
    parse: parse
  };

}());
