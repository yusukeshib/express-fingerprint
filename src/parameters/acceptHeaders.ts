import { Parameter } from "../types";

export interface AcceptHeaders {
  acceptHeaders: {
    accept: string;
    language: string;
  };
}

export const acceptHeaders: Parameter<AcceptHeaders> = function (next) {
  next(null, {
    acceptHeaders: {
      accept: this.req.headers["accept"],
      language: this.req.headers["accept-language"],
    },
  });
};
