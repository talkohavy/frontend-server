import { serviceName } from '../common/constants';
import { Config } from './types';

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
