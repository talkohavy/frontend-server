import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';

export class FrontendMiddleware {
  public constructor(private readonly app: Application) {}

  public useSourceMaps(): void {
    this.app.use((req: Request, _res: Response, next: NextFunction) => {
      if (!req.url.endsWith('.map')) return next();

      const isAllowedToSeeSourceMaps = req.headers['give-me-my-sourcemaps'] === 'please';

      if (isAllowedToSeeSourceMaps) {
        const sourcemapFilename = req.url.split('/').pop();
        req.url = `sourcemaps/${sourcemapFilename}`;
      }

      next();
    });
  }

  public useStaticFiles(): void {
    const pathToDistDir = path.join(process.cwd(), process.env.PATH_TO_DIST_DIR ?? 'dist');

    this.app.use(
      express.static(pathToDistDir, {
        setHeaders: (res, filePath) => {
          // Security headers for all static files
          res.setHeader('X-Content-Type-Options', 'nosniff');
          res.setHeader('X-Frame-Options', 'DENY');

          if (filePath.endsWith('.html')) {
            // Choose either No cache or Short cache for HTML files (in case any are served statically)
            res.setHeader('Cache-Control', 'no-store'); // no-cache, no-store, must-revalidate
            return;
          }

          if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
            // Long cache for static assets (usually have hashed names)
            res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
            return;
          }

          // Default cache strategy for other files
          res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
        },
      }),
    );
  }
}
