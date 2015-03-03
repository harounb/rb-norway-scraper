/*global module, require*/
module.exports = (function scraper(){
    var cheerio = require("cheerio"), //Dependencies
    init; //Functions

    init = function init(htmlDocument) {
        var $ = cheerio.load(htmlDocument);
        console.log(htmlDocument);
    };
    return{init: init};
}());
