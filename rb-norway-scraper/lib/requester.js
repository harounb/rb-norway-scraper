/*global module, console*/
module.exports = (function scraper() {
    'use strict';
    var init; //functions
    init = function init(urls, metaData) {
        if(!urls) {
            throw Error("Need url parameter");
        }
        else console.log(urls, metaData);
    };
return {init:init};

}());
