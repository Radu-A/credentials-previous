// middlewares/logger.ts
import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import crypto from "crypto";

// 1. Creamos y exportamos el inyector del Request ID
export const addRequestId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestId = crypto.randomUUID();
  res.locals.requestId = requestId;
  res.setHeader("X-Request-Id", requestId);
  next();
};

// 2. Le enseñamos a Morgan a leer el Request ID
morgan.token("id", (req: Request, res: Response) => {
  return res.locals.requestId as string;
});

// 3. Exportamos el middleware de Morgan ya configurado
export const httpLogger = morgan(
  "[ReqID: :id] :method :url -> Status: :status | Latencia: :response-time ms",
);
