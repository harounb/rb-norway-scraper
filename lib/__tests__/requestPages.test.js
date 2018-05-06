"use strict";

const requestPages = require("../requestPages");

const got = require("got");
const pLimit = require("p-limit");

jest.mock("got");
jest.mock("p-limit");

describe("requestPage", () => {
  beforeEach(() => {
    got.mockClear();
    pLimit.mockClear();
  });
  it("is a function", () => {
    expect(requestPages).toEqual(expect.any(Function));
  });
  it("will pass limit argument down to pLimit", () => {
    pLimit.mockImplementation(() => jest.fn);
    requestPages(["url1", "url2", "url3", "url4"], 3);
    expect(pLimit).toBeCalledWith(3);
  });
  it("will call got on all the urls but apply a limit to it", () => {
    const limit = jest.fn();
    pLimit.mockImplementation(() => limit);
    requestPages(["url1", "url2", "url3", "url4"], 3);

    expect(limit.mock.calls.length).toBe(4);
    limit.mock.calls[0][0]();
    limit.mock.calls[1][0]();
    limit.mock.calls[2][0]();
    limit.mock.calls[3][0]();
    expect(got.mock.calls[0][0]).toEqual("url1");
    expect(got.mock.calls[1][0]).toEqual("url2");
    expect(got.mock.calls[2][0]).toEqual("url3");
    expect(got.mock.calls[3][0]).toEqual("url4");
  });
  it("will return a promise that resolves with an array the contents got returns", () => {
    const limit = jest.fn(arg => arg());
    pLimit.mockImplementation(() => limit);
    got
      .mockReturnValueOnce(Promise.resolve({ body: "contents1" }))
      .mockReturnValueOnce(Promise.resolve({ body: "contents2" }))
      .mockReturnValueOnce(Promise.resolve({ body: "contents3" }))
      .mockReturnValueOnce(Promise.resolve({ body: "contents4" }));

    const requests = requestPages(["url1", "url2", "url3", "url4"], 3).then(
      ([contents1, contents2, contents3, contents4]) => {
        expect(contents1).toEqual("contents1");
        expect(contents2).toEqual("contents2");
        expect(contents3).toEqual("contents3");
        expect(contents4).toEqual("contents4");
      }
    );

    limit.mock.calls[0][0]();
    limit.mock.calls[1][0]();
    limit.mock.calls[2][0]();
    limit.mock.calls[3][0]();

    return requests;
  });
});
