import { Request } from "express";

export interface FingerprintResultComponent {
  [key: string]: {
    [key: string]: any;
  };
}

export interface FingerprintResult {
  hash: string;
  components?: FingerprintResultComponent[];
}

// types
export type Next<T extends FingerprintResultComponent> = (
  err: Error,
  result: T
) => void;

export type Parameter<T extends FingerprintResultComponent> = (
  next: Next<T>
) => void;

export interface FingerprintConfig {
  req: Request;
  parameters: Parameter<any>[];
}

