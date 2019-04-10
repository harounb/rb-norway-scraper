"use strict";

/**
 * scraper service for Rbnorway T7FR data
 */

const cheerio = require("cheerio");
const got = require("got");
const pLimit = require("p-limit");

const config = {
  limit: 1
};

const createLimitedGot = limitNumber => {
  const limit = pLimit(limitNumber);
  return (...args) => limit(() => got(...args));
};

const uniqueArray = array => [...new Set(array)];

const events = {
  homePageDownloadComplete: homePageUrl =>
    `Opened the homepage [url: ${homePageUrl}]...`,
  characterPageLinksGotten: characterPageLinks =>
    `Found frame data for ${characterPageLinks.length} characters`,
  frameDataDownloaded: response =>
    `Frame data downloaded [url: ${response.requestUrl}]`
};

const baseUrl = "http://rbnorway.org";
const homePageUrl = [baseUrl, "t7-frame-data"].join("/");

/**
 * Grabs links to the character pages from the homepage
 * @param {String} homePage html string of the homepage where we will extract links
 */
function getCharacterPageLinks(homePage) {
  const $ = cheerio.load(homePage);
  const characterPageLinkSelector = "a[href*=t7-frames]";

  return uniqueArray(
    $(characterPageLinkSelector)
      .map((i, el) => $(el).attr("href"))
      .get()
      .map(href =>
        href
          .toLowerCase()
          .split("/")
          .find(hrefFragment => hrefFragment.includes("t7-frames"))
      )
      .map(href => [baseUrl, href].join("/"))
  );
}

async function download(config) {
  const limitedGot = createLimitedGot(config.limit);
  const homePageRes = await limitedGot(homePageUrl);
  const homePage = homePageRes.body;

  console.log(events.homePageDownloadComplete(homePageRes.requestUrl));

  const characterPageLinks = getCharacterPageLinks(homePage);

  console.log(events.characterPageLinksGotten(characterPageLinks));

  const characterPageRequests = characterPageLinks.map(link =>
    limitedGot(link)
  );

  characterPageRequests.then(response =>
    console.log(events.frameDataDownloaded(response))
  );

  const characterPageResponses = await Promise.all(characterPageRequests);
  const characterPages = characterPageResponses.map(
    characterPageResponse => characterPageResponse.body
  );

  return characterPages;
}

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
        if (move.notation) {
          moves.push(move);
        }
      }
    });
  return moves;
}

const legacyCharacterNameMapping = {
  xiaoyu: "ling",
  jack7: "jack-7",
  // add specific ignored character mappings to specific parsers
  jack6: "jack-6",
  rogerjr: "roger-jr",
  forest: "forest-law"
};

function parseCharacter(page) {
  const $ = cheerio.load(page);
  const character = $("h2.title")
    .text()
    .toLowerCase()
    // add specific ignored words to specific parsers in the future
    .replace("t7", "")
    .replace("ttt2u", "")
    .replace("ttt2", "")
    .replace("frames", "")
    .trim()
    .replace(" ", "-");

  if (legacyCharacterNameMapping[character]) {
    return legacyCharacterNameMapping[character];
  }

  return character;
}

module.exports = scrape;
