"use strict";

const parsers = require("../parsers");

describe("requiring parsers", () => {
  it("returns an object", () => {
    expect(parsers).toEqual(expect.any(Object));
  });
  describe("and initing it with some html containing a single move", () => {
    let html;
    beforeEach(() => {
      html =
        '<html><body><div id="special"></div><table border="1"> <tr BGCOLOR="LightGray"> <td><b>Command</b></td> <td><b>Hit level</b></td> <td><b>Damage</b></td> <td><b>Start up frame</b></td> <td><b>Block frame</b></td> <td><b>Hit frame</b></td> <td><b>Counter hit frame</b></td> </tr> </h3> <tr> <td>1</td> <td>h</td> <td>9</td> <td>10</td> <td>+1</td> <td>+8</td> <td>+8</td> </tr> </table></body></html>';
    });
    it("will return an array of moves", () => {
      expect(parsers.parseMoves(html, "special")).toEqual(expect.any(Array));
    });

    it("will return a data object containing move data of valid format", () => {
      expect(parsers.parseMoves(html, "special")).toEqual([
        {
          notation: "1",
          hit_level: "h",
          damage: "9",
          speed: "10",
          on_block: "+1",
          on_hit: "+8",
          on_ch: "+8"
        }
      ]);
    });
  });

  describe("and initing with html containing multiple moves", () => {
    let html;
    beforeEach(() => {
      html =
        '<html><body><div id="special"></div><table border="1"> <tr BGCOLOR="LightGray"> <td><b>Command</b></td> <td><b>Hit level</b></td> <td><b>Damage</b></td> <td><b>Start up frame</b></td> <td><b>Block frame</b></td> <td><b>Hit frame</b></td> <td><b>Counter hit frame</b></td> </tr> </h3> <tr> <td>1</td> <td>h</td> <td>9</td> <td>10</td> <td>+1</td> <td>+8</td> <td>+8</td> </tr> <tr BGCOLOR="LightGray"> <td>1, 2</td> <td>h, h</td> <td>9,16</td> <td>10</td> <td>-2</td> <td>+3</td> <td>+7</td> </tr> <tr> <td>1, 2, 3</td> <td>h, h, m</td> <td>9,16,27</td> <td>10</td> <td>+2~+3</td> <td>KND</td> <td>KND</td> </tr> <tr BGCOLOR="LightGray"> <td>1, 2, 4</td> <td>h, h, h</td> <td>9,16,40</td> <td>10</td> <td>-4</td> <td>KND</td> <td>KND</td> </tr> <tr> <td>1, 3</td> <td>h, h</td> <td>9,13</td> <td>10</td> <td>-6</td> <td>+4</td> <td>+4</td> </tr></table></body></html>';
    });

    it("will return a data object containing move data of valid format", () => {
      const expectedMoves = {
        moves: [
          {
            notation: "1",
            hit_level: "h",
            damage: "9",
            speed: "10",
            on_block: "+1",
            on_hit: "+8",
            on_ch: "+8"
          },
          {
            notation: "1, 2",
            hit_level: "h, h",
            damage: "9,16",
            speed: "10",
            on_block: "-2",
            on_hit: "+3",
            on_ch: "+7"
          },
          {
            notation: "1, 2, 3",
            hit_level: "h, h, m",
            damage: "9,16,27",
            speed: "10",
            on_block: "+2~+3",
            on_hit: "KND",
            on_ch: "KND"
          },
          {
            notation: "1, 2, 4",
            hit_level: "h, h, h",
            damage: "9,16,40",
            speed: "10",
            on_block: "-4",
            on_hit: "KND",
            on_ch: "KND"
          },
          {
            notation: "1, 3",
            hit_level: "h, h",
            damage: "9,13",
            speed: "10",
            on_block: "-6",
            on_hit: "+4",
            on_ch: "+4"
          }
        ]
      };
      const moves = parsers.parseMoves(html, "special");
      expect(moves[0]).toEqual(expectedMoves.moves[0]);
      expect(moves[1]).toEqual(expectedMoves.moves[1]);
      expect(moves[2]).toEqual(expectedMoves.moves[2]);
      expect(moves[3]).toEqual(expectedMoves.moves[3]);
      expect(moves[4]).toEqual(expectedMoves.moves[4]);
    });
  });
});
