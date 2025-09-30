import { Application } from 'express';
import { postUseMiddleware } from '../../common/utils/postUseMiddleware';
import { preUseMiddleware } from '../../common/utils/preUseMiddleware';
import { CallContextMiddleware } from '../../lib/call-context/call-context.middleware';
import { attachBaseMiddlewares } from '../../middlewares/attachBaseMiddlewares';
import { attachErrorMiddlewares } from '../../middlewares/attachErrorMiddlewares';
import { callContextService } from '../initCallContextService';

export class MiddlewareRegistry {
  useAllMiddlewares(app: Application): void {
    const callContextMiddleware = new CallContextMiddleware(callContextService);

    attachBaseMiddlewares(app);

    callContextMiddleware.use(app, preUseMiddleware, postUseMiddleware);

    attachErrorMiddlewares(app);
  }
}
