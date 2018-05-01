"use strict";

const cheerio = require("cheerio");

function generateData($) {
  const moves = [];
  const headings = [
    "notation",
    "hit_level",
    "damage",
    "speed",
    "on_block",
    "on_hit",
    "on_ch",
    "notes"
  ];

  // Converting table to an array of moves
  $("tr").each(function cb(i) {
    let move;
    // Not including first row as it's a heading
    if (i !== 0) {
      move = {};
      $(this)
        .children()
        .each((j, elem) => {
          let value = null;
          if (
            $(elem)
              .text()
              .trim()
          ) {
            value = $(elem)
              .text()
              .trim();
          }
          move[headings[j]] = value;
        });
      moves.push(move);
    }
  });
  return moves;
}

function parse(htmlDocument) {
  const $ = cheerio.load(htmlDocument);
  const data = {};
  data.moves = generateData($);
  return data;
}

module.exports = {
  parse
};
