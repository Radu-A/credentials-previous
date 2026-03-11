// validator.ts
import { Request, Response, NextFunction } from "express";
import { EMAIL_REGEX, ConnectedUser } from "../models";

export const validateUserSync = (
  req: Request<{}, {}, ConnectedUser>, // We type the body with our interface
  res: Response,
  next: NextFunction,
): void => {
  const { credential, email, name } = req.body;

  // 1. Validate that no fields are missing
  if (!credential || !email || !name) {
    res.status(400).json({
      error: "Missing data. 'credential', 'email', and 'name' are required.",
    });
    return; // ⚠️ IMPORTANT: The return prevents the code from continuing to execute
  }

  // 2. Validate the email format
  if (!EMAIL_REGEX.test(email)) {
    res.status(400).json({
      error: "Invalid email format.",
    });
    return;
  }

  // 3. If everything is OK, we pass control to the next function (your route)
  next();
};
