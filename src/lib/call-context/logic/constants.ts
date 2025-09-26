export const Context = {
  RequestId: 'requestId',
  Method: 'method',
  OriginalUrl: 'originalUrl',
  Url: 'url',
  Path: 'path',
  Query: 'query',
  CookieHeaderValue: 'cookieHeaderValue',
} as const;

type TypeOfContext = typeof Context;
export type ContextKeys = keyof TypeOfContext;
export type ContextValues = TypeOfContext[ContextKeys];
