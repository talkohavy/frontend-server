import { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import { ControllerFactory } from '../../lib/controller-factory';

export class FrontendController implements ControllerFactory {
  constructor(private readonly app: Application) {}

  private getIndexHtml() {
    this.app.get('/*splat', (_req: Request, res: Response, _next: NextFunction) => {
      // Set shorter cache headers for the HTML document (so users get updates faster)
      res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour instead of 1 year
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');

      const pathToIndexFile = path.join(process.cwd(), 'dist', 'index.html');

      res.sendFile(pathToIndexFile);
    });
  }

  attachRoutes() {
    this.getIndexHtml();
  }
}
