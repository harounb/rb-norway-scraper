/*global require, describe, it, expect, jasmine*/
(function() {
    'use strict';

    describe("requiring scraper", function() {
        var scraper = require("../lib/scraper");
        it("returns an object", function() {
            expect(scraper).toEqual(jasmine.any(Object));
        });
        describe("and initing it with some html", function() {
            var html = '<html><body><table border="1"> <tr BGCOLOR="LightGray"> <td><b>Command</b></td> <td><b>Hit level</b></td> <td><b>Damage</b></td> <td><b>Start up frame</b></td> <td><b>Block frame</b></td> <td><b>Hit frame</b></td> <td><b>Counter hit frame</b></td> </tr> </h3> <tr> <td>1</td> <td>h</td> <td>9</td> <td>10</td> <td>+1</td> <td>+8</td> <td>+8</td> </tr> </table></body></html>';
            scraper.init(html);
            it("will return a data object when calling it's getData function", function() {
                expect(scraper.getData()).toEqual(jasmine.any(Object));
            });
            it("will return a data object containing move data of valid format", function() {
                expect(scraper.getData()).toEqual({
                    moves: [{
                        notation: '1',
                        hit_level: 'h',
                        damage: '9',
                        speed: '10',
                        on_block: '+1',
                        on_hit: '+8',
                        on_ch: '+8'
                    }]
                });
            });
        });
    });
}());
