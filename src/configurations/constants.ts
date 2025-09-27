import type { LoggerSettings } from '../lib/logger';
import { EnvironmentValues } from '../common/constants';

export const ConfigKeys = {
  Port: 'port',
  IsDev: 'isDev',
  LogSettings: 'logSettings',
} as const;

type TypeOfConfigKeys = typeof ConfigKeys;
export type ConfigKeyValues = TypeOfConfigKeys[keyof TypeOfConfigKeys];

export type Config = {
  [ConfigKeys.Port]: number;
  [ConfigKeys.IsDev]: boolean;
  [ConfigKeys.LogSettings]: LoggerServiceSettings;
};

export type LoggerServiceSettings = LoggerSettings & {
  serviceName?: string;
  logEnvironment?: EnvironmentValues;
};
