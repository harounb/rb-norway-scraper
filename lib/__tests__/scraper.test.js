"use strict";

const requester = require("../scraper");

describe("and trying to scrape with it", () => {
  it("will throw an error if the object doesn't contain a urls array", () => {
    expect(() => {
      requester.scrape();
    }).toThrowError("config not loaded");
  });

  it("will throw an error if the parameter is not an object", () => {
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
