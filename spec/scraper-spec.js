/*global require, describe, it, expect, beforeEach, jasmine*/
(function () {
    'use strict';

    describe("requiring scraper", function () {
        var scraper = require("../lib/scraper");
        it("returns an object", function () {
            expect(scraper).toEqual(jasmine.any(Object));
        });
        describe("and initing it with some html containing a single move", function () {
            var html;
            beforeEach(function () {
                html = '<html><body><table border="1"> <tr BGCOLOR="LightGray"> <td><b>Command</b></td> <td><b>Hit level</b></td> <td><b>Damage</b></td> <td><b>Start up frame</b></td> <td><b>Block frame</b></td> <td><b>Hit frame</b></td> <td><b>Counter hit frame</b></td> </tr> </h3> <tr> <td>1</td> <td>h</td> <td>9</td> <td>10</td> <td>+1</td> <td>+8</td> <td>+8</td> </tr> </table></body></html>';

            });
            it("will return a data object when calling it's getData function", function () {
                expect(scraper.scrape(html)).toEqual(jasmine.any(Object));
            });

            it("will return a data object containing move data of valid format", function () {

                expect(scraper.scrape(html)).toEqual({
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

        describe("and initing with html containing multiple moves", function () {
            var html;
            beforeEach(function () {
                html = '<html><body><table border="1"> <tr BGCOLOR="LightGray"> <td><b>Command</b></td> <td><b>Hit level</b></td> <td><b>Damage</b></td> <td><b>Start up frame</b></td> <td><b>Block frame</b></td> <td><b>Hit frame</b></td> <td><b>Counter hit frame</b></td> </tr> </h3> <tr> <td>1</td> <td>h</td> <td>9</td> <td>10</td> <td>+1</td> <td>+8</td> <td>+8</td> </tr> <tr BGCOLOR="LightGray"> <td>1, 2</td> <td>h, h</td> <td>9,16</td> <td>10</td> <td>-2</td> <td>+3</td> <td>+7</td> </tr> <tr> <td>1, 2, 3</td> <td>h, h, m</td> <td>9,16,27</td> <td>10</td> <td>+2~+3</td> <td>KND</td> <td>KND</td> </tr> <tr BGCOLOR="LightGray"> <td>1, 2, 4</td> <td>h, h, h</td> <td>9,16,40</td> <td>10</td> <td>-4</td> <td>KND</td> <td>KND</td> </tr> <tr> <td>1, 3</td> <td>h, h</td> <td>9,13</td> <td>10</td> <td>-6</td> <td>+4</td> <td>+4</td> </tr></table></body></html>';

            });

            it("will return a data object containing move data of valid format", function () {
                var expectedMoves = {
                    moves: [{
                        notation: '1',
                        hit_level: 'h',
                        damage: '9',
                        speed: '10',
                        on_block: '+1',
                        on_hit: '+8',
                        on_ch: '+8'
                    }, {
                        notation: '1, 2',
                        hit_level: 'h, h',
                        damage: '9,16',
                        speed: '10',
                        on_block: '-2',
                        on_hit: '+3',
                        on_ch: '+7'
                    }, {
                        notation: '1, 2, 3',
                        hit_level: 'h, h, m',
                        damage: '9,16,27',
                        speed: '10',
                        on_block: '+2~+3',
                        on_hit: 'KND',
                        on_ch: 'KND'
                    }, {
                        notation: '1, 2, 4',
                        hit_level: 'h, h, h',
                        damage: '9,16,40',
                        speed: '10',
                        on_block: '-4',
                        on_hit: 'KND',
                        on_ch: 'KND'
                    }, {
                        notation: '1, 3',
                        hit_level: 'h, h',
                        damage: '9,13',
                        speed: '10',
                        on_block: '-6',
                        on_hit: '+4',
                        on_ch: '+4'
                    }]
                };
                expect(scraper.scrape(html).moves[0]).toEqual(expectedMoves.moves[0]);
                expect(scraper.scrape(html).moves[1]).toEqual(expectedMoves.moves[1]);
                expect(scraper.scrape(html).moves[2]).toEqual(expectedMoves.moves[2]);
                expect(scraper.scrape(html).moves[3]).toEqual(expectedMoves.moves[3]);
                expect(scraper.scrape(html).moves[4]).toEqual(expectedMoves.moves[4]);

            });
        });

    });
}());
