import express from 'express';
import http, { Server } from 'http';
import { serviceName } from './common/constants';
import { postUseMiddleware } from './common/utils/postUseMiddleware';
import { preUseMiddleware } from './common/utils/preUseMiddleware';
import { bootstrap } from './core/bootstrap';
import { ModuleRegistry } from './core/moduleRegistry';
import { CallContextMiddleware } from './lib/call-context/call-context.middleware';
import { attachBaseMiddlewares } from './middlewares/attachBaseMiddlewares';
import { attachErrorMiddlewares } from './middlewares/attachErrorMiddlewares';

async function startServer() {
  const { configService, callContextService, loggerService: logger } = await bootstrap();

  const moduleRegistry = new ModuleRegistry();

  const callContextMiddleware = new CallContextMiddleware(callContextService);

  const app = express();
  const httpServer: Server = http.createServer(app);

  const PORT = configService.get<number>('port');

  attachBaseMiddlewares(app);
  callContextMiddleware.use(app, preUseMiddleware, postUseMiddleware);

  moduleRegistry.attachAllControllers(app);

  attachErrorMiddlewares(app);

  // WARNING!!! DO NOT LISTEN USING APP! While this doesn't affect normal routes, it does affect socketIO routes, They will not be able to connect.
  httpServer.listen(PORT, () => logger.log(`🚀 ${serviceName} is up and running on port ${PORT}`));
  httpServer.on('error', (error) => (logger.error(error.message, { error }), process.exit()));
}

startServer();
