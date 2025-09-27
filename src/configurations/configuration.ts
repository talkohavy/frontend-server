import { serviceName } from '../common/constants';
import { type Config } from './constants';

export function configuration(): Config {
  return {
    port: (process.env.PORT || 3000) as number,
    isDev: !!process.env.IS_DEV,
    logSettings: {
      logLevel: 'info',
      logEnvironment: 'development',
      serviceName: serviceName,
    },
  };
}
