import express from 'express';
import http, { Server } from 'http';
import { serviceName } from './common/constants';
import { ConfigKeys } from './configurations';
import { bootstrap, ModuleRegistry } from './core';
import { MiddlewareRegistry } from './core/middlewareRegistry';

async function startServer() {
  const { configService, loggerService: logger } = await bootstrap();

  const moduleRegistry = new ModuleRegistry();
  const middlewareRegistry = new MiddlewareRegistry();

  const app = express();
  const httpServer: Server = http.createServer(app);

  const PORT = configService.get<number>(ConfigKeys.Port);

  middlewareRegistry.useAllMiddlewares(app);
  moduleRegistry.attachAllControllers(app);

  // WARNING!!! DO NOT LISTEN USING APP! While this doesn't affect normal routes, it does affect socketIO routes, They will not be able to connect.
  httpServer.listen(PORT, () => logger.log(`🚀 ${serviceName} is up and running on port ${PORT}`));
  httpServer.on('error', (error) => (logger.error(error.message, { error }), process.exit()));
}

startServer();
