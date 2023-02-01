import { Response, Router } from "express";
import { CreateUserDTO, UserLoginDTO } from "../dtos/userDtos.js";
import { validateRequestBody } from "../middlewares/requestBodyValidationMiddleware.js";
import { CreateRequest, LoginRequest } from "./types/Request/genericRequests.js";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.post(
  "/signup",
  validateRequestBody,
  async (req: CreateRequest<CreateUserDTO>, res: Response) => {
    const result = await userController.create(req.body);

    if (!result.success) {
      res
        .status(500)
        .json({ error: "An error ocurred while creating the User entity" });
    } else {
      res.status(200).json(result.data);
    }
  }
);

userRouter.post(
  "/login",
  validateRequestBody,
  async (req: LoginRequest<UserLoginDTO>, res: Response) => {
    const result = await userController.login(req.body);

    if (!result.success && !result.data) {
      res
        .status(500)
        .json({ error: "An error ocurred while authenticating the User" });
    } else {
      if (!result.data) {
        res.status(400).json({
          error: "Bad Request: Invalid email or password",
        });
      } else {
        res.status(200).json(result.data);
      }
    }
  }
);

export default userRouter;  