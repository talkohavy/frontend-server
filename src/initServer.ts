import express from 'express';
import http, { Server } from 'http';
import { serviceName } from './common/constants';
import { postUseMiddleware } from './common/utils/postUseMiddleware';
import { preUseMiddleware } from './common/utils/preUseMiddleware';
import { configuration, initLoggerService } from './configurations';
import { initConfigService } from './configurations/initConfigService';
import { initCallContextService } from './lib/call-context';
import { CallContextMiddleware } from './lib/call-context/call-context.middleware';
import { attachBaseMiddlewares } from './middlewares/attachBaseMiddlewares';
import { attachErrorMiddlewares } from './middlewares/attachErrorMiddlewares';
import { attachFrontendModule } from './modules/frontend/frontend.module';
import { attachHealthCheckModule } from './modules/health-check/health-check.module';

async function startServer() {
  const configService = initConfigService(configuration());
  const callContextService = initCallContextService();
  const logger = initLoggerService(callContextService);

  const callContextMiddleware = new CallContextMiddleware(callContextService);

  const app = express();
  const httpServer: Server = http.createServer(app);

  const PORT = configService.get<number>('port');

  attachBaseMiddlewares(app);
  callContextMiddleware.use(app, preUseMiddleware, postUseMiddleware);

  attachHealthCheckModule(app);
  attachFrontendModule(app); // <--- all modules MUST be attached before this module, since it's like a dark hole - it catches everything.

  attachErrorMiddlewares(app);

  // WARNING!!! DO NOT LISTEN USING APP! While this doesn't affect normal routes, it does affect socketIO routes, They will not be able to connect.
  httpServer.listen(PORT, () => logger.log(`🚀 ${serviceName} is up and running on port ${PORT}`));
  httpServer.on('error', (error) => (logger.error(error.message, { error }), process.exit()));
}

startServer();
