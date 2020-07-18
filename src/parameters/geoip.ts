import GeoipLite from "geoip-lite";
import { Parameter } from "../types";

export interface GeoIp {
  geoip: {
    country: string;
  };
}

export const geoip: Parameter<GeoIp> = function (next) {
  const ip =
    (this.req.headers["x-forwarded-for"] || "").split(",").pop() ||
    this.req.connection.remoteAddress ||
    this.req.socket.remoteAddress ||
    this.req.connection.socket.remoteAddress;

  const geo = GeoipLite.lookup(ip);
  next(null, {
    geoip: {
      country: geo ? geo.country : null,
    },
  });
};
