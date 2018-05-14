"use strict";

const defaults = require("../config/defaults");
const requestPages = require("./requestPages");
const { parseMoves, parseCharacter } = require("./parsers");
const outputFiles = require("./outputFiles");

async function scrape(config) {
  if (typeof config !== "object" || config === null) {
    throw new Error("Configuration is not an object");
  }

  const { sources, game, limit, ver } = Object.assign({}, defaults, config);

  console.log(`Loading ${sources.length} pages from rbnorway`);

  const pages = await requestPages(sources, limit);

  console.log(`Converting pages to json`);

  const frameDatas = pages
    // splitting it out to basic and special move types
    .reduce(
      (accum, page) => [
        ...accum,
        { type: "basic", page },
        { type: "special", page }
      ],
      []
    )
    .map(({ page, type }) => ({
      moves: parseMoves(page, type),
      metadata: {
        game,
        ver,
        character: parseCharacter(page),
        // adding below to conform to old format
        type: type === "special" ? "normal" : "basic"
      }
    }));

  console.log("Outputting files");

  await outputFiles(frameDatas);

  console.log("Complete");
}

module.exports = scrape;
