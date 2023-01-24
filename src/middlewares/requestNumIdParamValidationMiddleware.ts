import { Response, NextFunction } from "express";
import { BaseParam } from "../routes/types/BaseParam.js";
import { GetByIdRequest } from "../routes/types/Request/genericRequests.js";

//This is just used at some endpoints where is needed to prevent empty or null base number id param.
export const validateRequestNumIdParam = (
  req: GetByIdRequest<BaseParam>,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id || !Number(req.params.id)) {
    res.status(400).json({
      message: "Bad Request: A number Id must be provided",
    });
    return;
  }
  next();
};
