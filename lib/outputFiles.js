"use strict";

const fs = require("fs-extra");
const pify = require("pify");

const pFs = pify(fs);

async function outputFiles(frameDatas) {
  await frameDatas.map(async fd => {
    const path = `./${fd.metadata.game}/${fd.metadata.game}-${
      fd.metadata.character
    }-${
      // adding below to conform to old format
      fd.metadata.type === "basic" ? 0 : 1
    }.json`;
    // outputs json file
    // also checks if the directory exists and if not creates it
    await pFs.outputJson(path, fd, { spaces: 2 });
  });
}

module.exports = outputFiles;
