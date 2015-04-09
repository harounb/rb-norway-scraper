/*global module, require*/
module.exports = (function scraper() {
    'use strict';
    var init,
        request = require("request-promise"); //Dependencies;//Functions
    init = function init(urls) {
        if (!urls) {
            throw Error("Need urls parameter");
        } else if (!Array.isArray(urls)) {
            throw Error("Urls parameter needs to be an array");
        } else {
            return request.get(urls[0]);
        }
    };
    return {
        init: init
    };

}());
