import httpMocks from "node-mocks-http";
import Middleware from "../lib";
import { FingerprintParameter } from "../lib/types";
import should from "should";
const { struct } = require("superstruct");
import { Request, Response } from "express";

let req: Request, res: Response;

beforeEach(function (done) {
  req = httpMocks.createRequest({
    method: "GET",
    url: "/test/path?myid=312",
    query: {
      myid: "312",
    },
    headers: {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7",
    },
    ip: "192.30.255.112",
  });
  res = httpMocks.createResponse();
  done();
});

it("without option", function (done) {
  const isValid = struct({
    hash: (v: string) => !!v.match(/^\w{32}$/),
    components: {
      useragent: {
        browser: {
          family: "string",
          version: (v: string) => !!v.match(/^[0-9.]+$/),
        },
        device: {
          family: "string",
          version: (v: string) => !!v.match(/^[0-9.]+$/),
        },
        os: {
          family: "string",
          major: (v: string) => !!v.match(/^[0-9.]+$/),
          minor: (v: string) => !!v.match(/^[0-9.]+$/),
        },
      },
      acceptHeaders: {
        accept: (v: string) => v === "*/*",
        language: (v: string) => v === "en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7",
      },
      geoip: {
        country: (v: string) => v === "US",
      },
    },
  });
  const middleware = Middleware();
  middleware(req, res, function (err: any) {
    isValid(req.fingerprint);
    done();
  });
});
it("custom parameter", function (done) {
  const isValid = struct({
    hash: (v: string) => !!v.match(/^\w{32}$/),
    components: {
      param1: (v: string) => v === "value1",
      param2: (v: string) => v === "value2",
    },
  });

  const P1: FingerprintParameter = function (next) {
    next(null, {
      param1: "value1",
    });
  };
  const P2: FingerprintParameter = function (next) {
    next(null, {
      param2: "value2",
    });
  };

  const middleware = Middleware({
    parameters: [P1, P2],
  });

  middleware(req, res, function (err: any) {
    isValid(req.fingerprint);
    done();
  });
});
