import { Environment, serviceName } from '../common/constants';
import { LogLevel } from '../lib/logger';
import { type Config } from './constants';

export function configuration(): Config {
  return {
    port: (process.env.PORT || 3000) as number,
    isDev: !!process.env.IS_DEV,
    logSettings: {
      logLevel: LogLevel.Debug,
      logEnvironment: Environment.Dev,
      serviceName: serviceName,
    },
  };
}
