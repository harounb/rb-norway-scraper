"use strict";
const cheerio = require("cheerio");
const got = require("got");
/**
 * scraper service for Rbnorway T7FR data
 */

const baseUrl = "http://rbnorway.org";
const homePageUrl = [baseUrl, "t7-frame-data"].join("/");
const characterPageLinkSelector = "a[href*=t7-frames]";

function getCharacterPageUrl(homePage) {
  const $ = cheerio.load(homePage);
  return [
    ...new Set(
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
    )
  ];
}

async function download(limit) {
  const homePageRes = await limit(() => got(homePageUrl));
  const characterPageLinks = getCharacterPageUrl(homePageRes.body);
  const characterPageRess = characterPageLinks.map(link =>
    limit(() => got(link))
  );

  const result = await Promise.all(characterPageRess);
  console.log(result);
}

module.exports = { download };
