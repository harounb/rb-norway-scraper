"use strict";

const pLimit = require("p-limit");
const got = require("got");

function requestPages(sources, limitOpt) {
  const limit = pLimit(limitOpt);
  const gots = sources.map(source =>
    limit(() => got(source).then(res => res.body))
  );

  return Promise.all(gots);
}

module.exports = requestPages;
