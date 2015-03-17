/*global require, describe, it, expect, jasmine*/
(function() {
    'use strict';
    describe("requiring requester", function() {
        var requester = require("../lib/requester");
        it("returns an object", function() {
            expect(requester).toEqual(jasmine.any(Object));
        });

        describe("and initing it", function() {
            it("will throw an error if the object doesn't contain a urls array", function() {
                expect(function() {
                    requester.init();
                }).toThrowError("Need urls parameter");
            });

            it("will throw an error if the parameter is not an array", function() {
                expect(function() {
                    requester.init("hello");
                }).toThrowError("Urls parameter needs to be an array");
                expect(function() {
                    requester.init(1);
                }).toThrowError("Urls parameter needs to be an array");
                expect(function() {
                    requester.init({
                        foo: 1
                    });
                }).toThrowError("Urls parameter needs to be an array");
            });

            it("will return an object with a doneEach function", function(){
                expect(function() {
                    requester.init(["hello"].doneEach);
                }).toBeTruthy();
            });

        });
    });
}());
