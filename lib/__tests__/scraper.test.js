"use strict";

const proxyquire = require("proxyquire").noCallThru();

const requester = proxyquire("../scraper", {
  "request-promise": {
    get() {
      return {
        then() {}
      };
    }
  }
});

describe("requiring requester", () => {
  it("returns an object", () => {
    expect(requester).toEqual(expect.any(Object));
  });

  describe("and trying to scrape with it", () => {
    it("will throw an error if the object doesn't contain a urls array", () => {
      expect(() => {
        requester.scrape();
      }).toThrowError("config not loaded");
    });

    it("will throw an error if the parameter is not an array", () => {
      expect(() => {
        requester.scrape("hello");
      }).toThrowError("config not loaded");
      expect(() => {
        requester.scrape(1);
      }).toThrowError("config not loaded");
      expect(() => {
        requester.scrape({
          foo: 1
        });
      }).not.toThrowError("config not loaded");
    });
  });
});
