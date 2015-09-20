/*global module, require, console*/
module.exports = (function scraper() {
    'use strict';

    //Dependencies
    var markupParser = require("./markupParser"),
        request = require("request-promise"),
        jsonfile = require('jsonfile'),
        mkdirp = require('mkdirp'),
        async = require('async'),

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
                        character: character.id,
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

    performRequest = function performRequest(job, callback) {

        var handleResponse, handleError;
        handleResponse = function handleResponse(html) {
            var data = markupParser.parse(html);
            //Implementing version 0.3 of the tekken feed format
            data.metadata = {
                ver: "0.4",
                game: job.game,
                character: job.character,
                type: job.sourceIndex === 0 ? "basic" : "normal"
            };

            mkdirp(job.filePath, function (err) {
                if (err) {
                    console.error(err);

                }
                jsonfile.writeFile(job.filePath + "/" + job.fileName, data);

            });
            callback();
        };

        handleError = function handleError() {
            console.log("Job Failed: " + job.source);
            callback();
        };

        request.get(job.source).then(handleResponse, handleError);

    };

    scrape = function scrape(conf) {
        var resolvedConfig,
            jobs,
            queue;

        if (conf !== null && typeof conf === 'object') {
            resolvedConfig = (function () {
                var defaults = {
                        path: "./",
                        requestLimit: 20
                    },
                    property;

                for (property in defaults) {
                    if (defaults.hasOwnProperty(property)) {
                        if (!conf[property]) {
                            conf[property] = defaults[property];
                        }
                    }
                }

                return conf;
            }());

            jobs = formJobsFromConf(resolvedConfig);
            queue = async.queue(performRequest, resolvedConfig.requestLimit);

            console.log("Processing " + jobs.length + " jobs...");

            queue.push(jobs);



        } else {
            throw Error("config not loaded");

        }

    };



    return {
        scrape: scrape

    };

}());
