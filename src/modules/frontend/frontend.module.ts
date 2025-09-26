import { Application } from 'express';
import { FrontendController } from './frontend.controller';
import { FrontendMiddleware } from './frontend.middleware';

export function attachFrontendModule(app: Application) {
  const frontendController = new FrontendController(app);
  const frontendMiddleware = new FrontendMiddleware(app);

  frontendMiddleware.useSourceMaps();
  frontendMiddleware.useStaticFiles();

  frontendController.attachRoutes();
}
