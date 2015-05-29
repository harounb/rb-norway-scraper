/*global module, require, console, setTimeout*/
module.exports = (function scraper() {
    'use strict';

    //Dependencies
    var markupParser = require("./markupParser"),
        request = require("request-promise"),
        jsonfile = require('jsonfile'),
        mkdirp = require('mkdirp'),

        //Functions
        formJobsFromConf,
        performRequest,
        scrape,

        //variables
        requestAmount = 0,
        requestLimit = 7;

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
                        filePath: conf.path,
                        fileName: game.id + "-" + character.id + "-" + sourceIndex + ".json"
                    });
                });
            });
        });
        return jobs;
    };

    performRequest = function performRequest(job) {

        var handleResponse, handleError;
        handleResponse = function handleResponse(html) {
            requestAmount--;
            var data = markupParser.parse(html);

            //Implementing version 0.3 of the tekken feed format
            data.metadata = {
                ver: "0.3",
                game: job.game,
                character: job.character
            };

            mkdirp(job.filePath, function (err) {
                if (err) {
                    console.error(err);

                }
                jsonfile.writeFile(job.filePath + "/" + job.fileName, data);

            });

        };

        handleError = function handleError() {
            requestAmount--;
            console.log("Job Failed: " + job.source);
        };

        if (requestAmount <= requestLimit) {
            request.get(job.source).then(handleResponse, handleError);
            requestAmount++;

        } else {
            setTimeout(function () {
                while (requestAmount > requestLimit) {
                    performRequest(job);
                }
            }, 5000);

        }

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
