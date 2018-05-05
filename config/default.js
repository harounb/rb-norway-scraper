"use strict";

module.exports = {
  game: "t7",
  output: "./t7",
  sources: [
    "http://rbnorway.org/t7-frame-data/akuma-t7-frames",
    "http://rbnorway.org/t7-frame-data/alisa-t7-frames",
    "http://rbnorway.org/t7-frame-data/asuka-t7-frames",
    "http://rbnorway.org/t7-frame-data/bob-t7-frames",
    "http://rbnorway.org/t7-frame-data/bryan-t7-frames",
    "http://rbnorway.org/t7-frame-data/claudio-t7-frames"
  ],
  queue: {
    concurrency: 3
  }
};
