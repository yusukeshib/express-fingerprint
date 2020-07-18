import GeoipLite from "geoip-lite";
import { FingerprintResultComponent, FingerprintParameter } from "../types";

export interface GeoIp extends FingerprintResultComponent {
  geoip: {
    country: string;
  };
}

export const geoip: FingerprintParameter<GeoIp> = function (next) {
  const ip =
    (this.req.headers["x-forwarded-for"] || "").split(",").pop() ||
    this.req.connection?.remoteAddress ||
    this.req.socket?.remoteAddress ||
    this.req.connection?.socket?.remoteAddress ||
    this.req.ip;

  const geo = GeoipLite.lookup(ip);
  next(null, {
    geoip: {
      country: geo ? geo.country : null,
    },
  });
};
