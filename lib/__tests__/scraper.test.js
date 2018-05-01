
    'use strict';

    describe("requiring requester", function () {
        var proxyquire = require('proxyquire').noCallThru(),
            requester = proxyquire("../scraper", {
                "request-promise": {
                    get: function () {
                        return {
                            then: function () {

                            }
                        };
                    }
                }
            });
        it("returns an object", function () {
            expect(requester).toEqual(jasmine.any(Object));
        });

        describe("and trying to scrape with it", function () {
            it("will throw an error if the object doesn't contain a urls array", function () {
                expect(function () {
                    requester.scrape();
                }).toThrowError("config not loaded");
            });

            it("will throw an error if the parameter is not an array", function () {
                expect(function () {
                    requester.scrape("hello");
                }).toThrowError("config not loaded");
                expect(function () {
                    requester.scrape(1);
                }).toThrowError("config not loaded");
                expect(function () {
                    requester.scrape({
                        foo: 1
                    });
                }).not.toThrowError("config not loaded");
            });

        });
    });