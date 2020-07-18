declare global {
  namespace Express {
    interface Request {
      fingerprint?: fingerprint.FingerprintResult;
    }
  }
}

declare namespace fingerprint {
  interface FingerprintResultComponent {
    [key: string]: {
      [key: string]: any;
    };
  }

  interface FingerprintResult {
    hash: string;
    components?: FingerprintResultComponent[];
  }

  // types
  type FingerprintNext<T extends FingerprintResultComponent> = (
    err: Error,
    result: T
  ) => void;

  type FingerprintParameter<T extends FingerprintResultComponent> = (
    next: FingerprintNext<T>
  ) => void;

  interface FingerprintConfig {
    req: Express.Request;
    parameters: FingerprintParameter<any>[];
  }
}

export = fingerprint;
