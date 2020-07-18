import { FingerprintResultComponent, FingerprintParameter } from "../types";

export interface AcceptHeaders extends FingerprintResultComponent {
  acceptHeaders: {
    accept: string;
    language: string;
  };
}

export const acceptHeaders: FingerprintParameter<AcceptHeaders> = function (
  next
) {
  next(null, {
    acceptHeaders: {
      accept: this.req.headers["accept"],
      language: this.req.headers["accept-language"],
    },
  });
};
