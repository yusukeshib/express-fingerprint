declare global {
  namespace Express {
    interface Request {
      fingerprint?: fingerprint.FingerprintResult;
    }
  }
}

declare namespace fingerprint {
  export interface FingerprintResultComponent {
    [key: string]: any;
  }

  export interface FingerprintResult {
    hash: string;
    components?: FingerprintResultComponent[];
  }

  // types
  export type FingerprintNext<T extends FingerprintResultComponent> = (
    err: Error,
    result: T
  ) => void;

  export type FingerprintParameter<
    T extends FingerprintResultComponent = any
  > = (
    next: FingerprintNext<T>,
    req?: Express.Request,
    res?: Express.Response
  ) => void;

  export interface FingerprintConfig {
    req?: Express.Request;
    parameters: FingerprintParameter<any>[];
  }
}

export = fingerprint;
