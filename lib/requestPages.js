"use strict";

const pLimit = require("p-limit");
const got = require("got");

function requestPages(config) {
  if (typeof config !== "object" || config === null) {
    throw new Error("Configuration is not an object");
  }

  const { sources = [], limit: limitOpt = {} } = config;

  const limit = pLimit(limitOpt);
  const gots = sources.map(source => limit(() => got(source)));

  return Promise.all(gots);
}

module.exports = requestPages;
