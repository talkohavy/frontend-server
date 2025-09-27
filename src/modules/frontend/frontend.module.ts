import { Application } from 'express';
import { FrontendController } from './frontend.controller';
import { FrontendMiddleware } from './frontend.middleware';

export class FrontendModule {
  private static instance: FrontendModule;

  private constructor() {}

  static getInstance(): FrontendModule {
    if (!FrontendModule.instance) {
      FrontendModule.instance = new FrontendModule();
    }
    return FrontendModule.instance;
  }

  attachController(app: Application): void {
    const frontendController = new FrontendController(app);
    const frontendMiddleware = new FrontendMiddleware(app);

    frontendMiddleware.useSourceMaps();
    frontendMiddleware.useStaticFiles();

    frontendController.attachRoutes();
  }
}
