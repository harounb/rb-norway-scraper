/*global module, require*/
module.exports = (function scraper() {
    'use strict';
    var init,
        request = require("request-promise"); //Dependencies;//Functions
    init = function init(urls) {
        var url, //Loop Variables
        arrayOfPromises = []; //Our return object

        if (!urls) {
            throw Error("Need urls parameter");
        } else if (!Array.isArray(urls)) {
            throw Error("Urls parameter needs to be an array");
        } else {
            for (url in urls) {
                arrayOfPromises.push(request.get(url));
            }
            return arrayOfPromises;
        }
    };
    return {
        init: init
    };

}());
