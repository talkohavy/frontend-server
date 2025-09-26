import { LogLevelValues } from '../logger/logic/constants';

export type EnrichLogMetadataProps = { [key: string]: any };

export interface LoggerSettings {
  serviceName?: string;
  logLevel?: LogLevelValues;
  logEnvironment?: string;
  useColoredOutput?: boolean;
}
