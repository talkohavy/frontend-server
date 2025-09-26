import { LoggerSettings } from '../lib/loggerService/types';

export type Config = {
  port: number;
  isDev: boolean;
  logSettings: LoggerSettings;
};
