import { Application } from 'express';
import { FrontendModule } from '../../modules/frontend/frontend.module';
import { HealthCheckModule } from '../../modules/health-check/health-check.module';
import { IModule } from './types';
// import { TransactionsModule } from '../modules/transactions/transactions.module';

export class ModuleRegistry {
  private modules: IModule[] = [];

  constructor() {
    this.initializeModules();
  }

  private initializeModules(): void {
    // Register all modules here
    this.modules.push(HealthCheckModule.getInstance());
    this.modules.push(FrontendModule.getInstance());
    // this.modules.push(TransactionsModule.getInstance());
  }

  attachAllControllers(app: Application): void {
    this.modules.forEach((module) => {
      module.attachController(app);
    });
  }
}
