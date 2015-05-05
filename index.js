/*globals module, require*/
module.exports = (function rBNorwayScraper() {
    'use strict';

    //Dependencies
    var config = require("./config"),
        scraper = require("./lib/scraper");

    scraper.scrape(config);

}());
