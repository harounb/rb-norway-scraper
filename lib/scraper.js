/*global module, require, console*/
module.exports = (function scraper() {
  'use strict';

  //Dependencies
  var markupParser = require("./markupParser"),
    request = require("request-promise"),

    //Functions
    scrape,
    performRequest;

  performRequest = function performRequest(conf) {
    var processUrl = function processUrl(url) {
      var handleResponse = function handleResponse(html) {
        var data = markupParser.parse(html);
      //  console.log(data);
        //Somehow append this data to any other data obtained from another url
      };
      request.get(url).then(handleResponse);

    };


  //  console.log(conf.scrapes);
    conf.scrapes.forEach(function (scrape) {
      scrape.urls.forEach(processUrl);

    });

  };



  scrape = function scrape(conf) {
    if (conf !== null && typeof conf === 'object') {
      performRequest(conf);

    } else {
      throw Error("config not loaded");

    }

  };



  return {
    scrape: scrape

  };

}());
