import { ConfigService } from '../lib/config';
import { Config } from './types';

export let configService: ConfigService<Config>;

export function initConfigService(initialConfig: Config) {
  configService = new ConfigService(initialConfig);

  return configService;
}
