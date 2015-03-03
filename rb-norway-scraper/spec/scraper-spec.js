/*global require, describe, it, expect, jasmine*/
(function() {
    'use strict';

    describe("requiring scraper", function() {
        var scraper = require("../lib/scraper");
        it("returns an object", function() {
            expect(scraper).toEqual(jasmine.any(Object));
        });
    });

}());
