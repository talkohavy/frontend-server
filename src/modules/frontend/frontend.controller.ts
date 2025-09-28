import { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import { HTML_CACHE_HEADER } from '../../common/constants';
import { ControllerFactory } from '../../lib/controller-factory';

export class FrontendController implements ControllerFactory {
  constructor(private readonly app: Application) {}

  private getIndexHtml() {
    this.app.get('/*splat', (req: Request, res: Response, _next: NextFunction) => {
      if (req.headers['if-none-match'] || req.headers['if-modified-since']) {
        // 🔴 DEBUG HERE: Log cache validation headers
        console.log('🛠️ Cache Validation Headers Present');
      }
      const cacheHeaders = {
        'if-none-match': req.headers['if-none-match'],
        'if-modified-since': req.headers['if-modified-since'],
        'cache-control': req.headers['cache-control'],
        'user-agent': req.headers['user-agent']?.substring(0, 50) + '...',
      };

      console.log('🌐 HTML Request Debug:', {
        url: req.url,
        method: req.method,
        cacheHeaders,
        timestamp: new Date().toISOString(),
      });

      // Set shorter cache headers for the HTML document (so users get updates faster)
      res.setHeader('Cache-Control', HTML_CACHE_HEADER);
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
