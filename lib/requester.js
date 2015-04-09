/*global module, require, console*/
module.exports = (function requester() {
    'use strict';

    //Dependencies
    var scraper = require("./scraper"),
        request = require("request-promise"),

        //Functions
        init,
        performRequest,

        //Variables
        config,
        previousScrapes = [];

    performRequest = function performRequest() {
        var processUrl = function processUrl (url, index, urls) {
            var handleResponse = function handleResponse(html) {
                var data = scraper.scrape(html);
                previousScrapes.push(data);
                if(previousScrapes.length === urls.length) {
                    console.log(previousScrapes);
                }
                console.log(data);
                //Somehow append this data to any other data obtained from another url
            };
                request.get(url).then(handleResponse);

        };


        console.log(config.scrapes);
        config.scrapes.forEach(function(scrape) {
            scrape.urls.forEach(processUrl);
        });
    };



    init = function init(conf) {
        if(conf !== null && typeof conf === 'object') {
            config = conf;
        } else {
            throw Error("config not loaded");
        }
    };



    return {
        init: init,
        config: config,
        performRequest: performRequest
    };

}());
