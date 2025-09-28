export const serviceName = 'frontend-server';

export const Environment = {
  Prod: 'prod',
  Dev: 'dev',
} as const;

type TypeOfEnvironment = typeof Environment;
export type EnvironmentKeys = keyof TypeOfEnvironment;
export type EnvironmentValues = TypeOfEnvironment[EnvironmentKeys];

export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
} as const;

export type StatusCodeKeys = keyof typeof StatusCodes;
export type StatusCodeValues = (typeof StatusCodes)[StatusCodeKeys];

export const HEADERS = {
  RequestId: 'x-request-id',
};

export const HTML_CACHE_HEADER = 'public, max-age=3600'; // no-cache, no-store, must-revalidate, 'public, max-age=3600'
