/*global require, describe, it, expect, jasmine*/
(function() {
    'use strict';
    describe("requiring requester", function() {
        var requester = require("../lib/requester");
        it("returns an object", function() {
            expect(requester).toEqual(jasmine.any(Object));
        });

        describe("and initing it", function() {
            it("will throw an error if the object doesn't contain a url array/string", function() {
                expect(function() {
                    requester.init();
                }).toThrowError("Need url parameter");
            });
        });
    });
}());
