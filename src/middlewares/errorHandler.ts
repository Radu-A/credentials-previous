import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../model";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) => {
  const reqId = (req as any).id || "no-id";

  console.error(`[${reqId}] DB Error:`, err.message);

  res.status(500).json({ error: "Internal error in database" });
};
