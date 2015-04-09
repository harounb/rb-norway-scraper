/*globals module, require*/
module.exports = (function rBNorwayScraper() {
    'use strict';

    //Dependencies
    var config = require("./config"),
        requester = require("./lib/requester").init(config);

    requester.performRequest();

    return requester;
});
