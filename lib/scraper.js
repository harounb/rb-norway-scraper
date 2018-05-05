"use strict";

const markupParser = require("./markupParser");
const got = require("got");
const jsonfile = require("jsonfile");
const mkdirp = require("mkdirp");
const async = require("async");

function formJobsFromConf(conf) {
  const jobs = [];
  conf.games.forEach(game => {
    game.characters.forEach(character => {
      character.sources.forEach((source, sourceIndex) => {
        jobs.push({
          game: game.id,
          character: character.id,
          source,
          sourceIndex,
          filePath: conf.path,
          fileName: `${game.id}-${character.id}-${sourceIndex}.json`
        });
      });
    });
  });
  return jobs;
}

function performRequest(job, callback) {
  function handleResponse(html) {
    const data = markupParser.parse(html);
    // Implementing version 0.4 of the tekken feed format
    data.metadata = {
      ver: "0.4",
      game: job.game,
      character: job.character,
      type: job.sourceIndex === 0 ? "basic" : "normal"
    };

    mkdirp(job.filePath, err => {
      if (err) {
        console.error(err);
      }
      jsonfile.writeFile(`${job.filePath}/${job.fileName}`, data);
    });
    callback();
  }

  function handleError() {
    console.log(`Job Failed: ${job.source}`);
    callback();
  }

  got(job.source).then(handleResponse, handleError);
}

function scrape(conf) {
  const defaults = {
    path: "./",
    requestLimit: 20
  };

  if (typeof conf !== "object" || conf === null) {
    throw Error("config not loaded");
  }

  const resolvedConfig = Object.assign({}, defaults, conf);

  const jobs = formJobsFromConf(resolvedConfig);
  const queue = async.queue(performRequest, resolvedConfig.requestLimit);

  console.log(`Processing ${jobs.length} jobs...`);

  queue.push(jobs);
}

module.exports = {
  scrape
};
