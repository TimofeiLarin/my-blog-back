import { Request, Response } from "express";
import { validationResult } from "express-validator";


const validationErrors = (request: Request, response: Response, next: () => void ) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json(errors.array());
  }

  return next();
};

export { validationErrors };
