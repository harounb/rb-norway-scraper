/*global module*/
module.exports = (function scraper() {
    'use strict';
    var init; //functions
    init = function init(urls, metaData) {
        if (!urls) {
            throw Error("Need urls parameter");
        } else if (!Array.isArray(urls)) {
            throw Error("Urls parameter needs to be an array");
        } else {
            return {
                doneEach: urls + metaData
            };
        }
    };
    return {
        init: init
    };

}());
