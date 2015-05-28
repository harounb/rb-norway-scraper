/*globals module, require, process, console*/
module.exports = (function rBNorwayScraper() {
    'use strict';

    //Dependencies
    var scraper = require("./lib/scraper"),
        jf = require('jsonfile'),

        //functions
        isJSON,

        //variables
        file;

    /**
        check if string is parseable to json.
        Source: http://stackoverflow.com/questions/9804777/how-to-test-if-a-string-is-json-or-not
    */
    isJSON = function isJSON(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };

    if (!isJSON(process.argv[2])) {
        if (process.argv[2]) {
            console.log("Provided argument not JSON. Interpreting as file");
            file = process.argv[2];
        } else {
            console.log("No argument provided. Attempting to load config from config.json");
            file = "config.json";
        }
        jf.readFile(file, function (err, obj) {
            scraper.scrape(obj);
        });

    } else {
        console.log("provided argument is JSON. Using as config");
        scraper.scrape();

    }

}());
