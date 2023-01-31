import { Request, Response, NextFunction } from "express";
import { validateJwt } from "../utils/validateJwt.js";

export const validateAuthJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!req.headers.authorization || req.headers.authorization === "" ) {
    res.status(401).json({
      message: "Unauthorized: Invalid authorization header",
    });
    return;
  }

  const validationResult = validateJwt(req.headers.authorization.split(" ")[1])

  if (!validationResult.decodedJwt) {
    res.status(401).json({
      message: `Unauthorized: ${validationResult.errorMessage}`,
    });
    return;
  }else {
    req.body['userId'] = validationResult.decodedJwt.userId
  }
  next();
};
