import type { NextFunction, Request, RequestHandler, Response } from 'express';

type AsyncRequestHandler = (
  request: Request,
  response: Response,
) => Promise<void>;

export function asyncHandler(handler: AsyncRequestHandler): RequestHandler {
  return (request: Request, response: Response, next: NextFunction): void => {
    handler(request, response).catch(next);
  };
}
