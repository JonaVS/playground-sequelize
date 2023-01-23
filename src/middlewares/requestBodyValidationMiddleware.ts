import { Request, Response, NextFunction } from "express";

//This is just used at some endpoints when is needed to prevent empty or null request body.
export const validateRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: "Bad Request: The request body is empty or null",
    });
    return;
  }
  next();
};
