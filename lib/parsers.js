"use strict";

const cheerio = require("cheerio");

function parseMoves(page, type) {
  const $ = cheerio.load(page);
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
  $(`#${type} ~ table`)
    .children("tr")
    .each(function cb(i) {
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

const legacyCharacterNameMapping = {
  xiaoyu: "ling",
  jack7: "jack-7"
};

function parseCharacter(page) {
  const $ = cheerio.load(page);
  const character = $("h2.title")
    .text()
    .toLowerCase()
    .replace("t7", "")
    .replace("frames", "")
    .trim()
    .replace(" ", "-");

  if (legacyCharacterNameMapping[character]) {
    return legacyCharacterNameMapping[character];
  }

  return character;
}

module.exports = { parseMoves, parseCharacter };
