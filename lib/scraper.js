/*global module, require, console*/
module.exports = (function scraper() {
    'use strict';

    //Dependencies
    var markupParser = require("./markupParser"),
        request = require("request-promise"),
        jsonfile = require('jsonfile'),

        //Functions
        formJobsFromConf,
        performRequest,
        scrape;

    formJobsFromConf = function formJobsFromConf(conf) {
        var jobs = [];
        conf.games.forEach(function (game) {
            game.characters.forEach(function (character) {
                character.sources.forEach(function (source, sourceIndex) {
                    jobs.push({
                        game: game.id,
                        character: character,
                        source: source,
                        sourceIndex: sourceIndex,
                        filePath: conf.path
                    });
                });
            });
        });
        return jobs;
    };

    performRequest = function performRequest(job) {

        var handleResponse;
        handleResponse = function handleResponse(html) {
            var data = markupParser.parse(html);

            //Implementing version 0.3 of the tekken feed format
            data.metadata = {
                ver: "0.3",
                game: job.game,
                character: job.character
            };
            jsonfile.writeFile(job.filePath + "/" + job.game + "-" + job.character.id + "-" + job.sourceIndex + ".json", data);

        };

        request.get(job.source).then(handleResponse);
    };

    scrape = function scrape(conf) {
        if (conf !== null && typeof conf === 'object') {
            var jobs = formJobsFromConf(conf);
            console.log("Processing " + jobs.length + " jobs...");
            jobs.forEach(function (job) {
                performRequest(job);
            });

        } else {
            throw Error("config not loaded");

        }

    };



    return {
        scrape: scrape

    };

}());
