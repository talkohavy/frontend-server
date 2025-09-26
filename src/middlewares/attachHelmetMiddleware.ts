import type { Application } from 'express';
import {
  contentSecurityPolicy,
  crossOriginEmbedderPolicy,
  crossOriginOpenerPolicy,
  crossOriginResourcePolicy,
  originAgentCluster,
  referrerPolicy,
  strictTransportSecurity,
  xContentTypeOptions,
  xDnsPrefetchControl,
  xDownloadOptions,
  xFrameOptions,
  xPermittedCrossDomainPolicies,
  xXssProtection,
} from 'helmet';

type AttachHelmetMiddlewareProps = {
  app: Application;
};

export function attachHelmetMiddleware(props: AttachHelmetMiddlewareProps) {
  const { app } = props;

  app.use(
    contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", 'http://localhost:8000', 'ws://localhost:8000'],
        imgSrc: ["'self'", 'https://firebasestorage.googleapis.com'],
        upgradeInsecureRequests: [],
        // scriptSrc: ["'self'", 'example.com'],
        // objectSrc: ["'none'"],
      },
    }),
  );
  app.use(crossOriginEmbedderPolicy({ policy: 'credentialless' }));
  app.use(crossOriginOpenerPolicy({ policy: 'same-origin' }));
  app.use(crossOriginResourcePolicy({ policy: 'cross-origin' }));
  app.use(originAgentCluster());
  app.use(referrerPolicy({ policy: 'no-referrer' }));
  app.use(strictTransportSecurity());
  app.use(xContentTypeOptions());
  app.use(xDnsPrefetchControl({ allow: false }));
  app.use(xDownloadOptions());
  app.use(xFrameOptions({ action: 'sameorigin' }));
  app.use(xPermittedCrossDomainPolicies({ permittedPolicies: 'none' }));
  app.use(xXssProtection());
}
