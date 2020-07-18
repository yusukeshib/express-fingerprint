import ua from "useragent";
import { FingerprintResultComponent, FingerprintParameter } from "../types";

interface Useragent extends FingerprintResultComponent {
  useragent: {
    browser: {
      family: string;
      version: string;
    };
    device: {
      family: string;
      version: string;
    };
    os: {
      family: string;
      major: string;
      minor: string;
    };
  };
}

export const useragent: FingerprintParameter<Useragent> = function (next) {
  const agent = ua.parse(this.req.headers["user-agent"]);
  next(null, {
    useragent: {
      browser: {
        family: agent.family,
        version: agent.major,
      },
      device: {
        family: agent.device.family,
        version: agent.device.major,
      },
      os: {
        family: agent.os.family,
        major: agent.os.major,
        minor: agent.os.minor,
      },
    },
  });
};
