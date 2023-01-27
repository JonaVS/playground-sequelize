import { Response, Router } from "express";
import { CreateUserDTO } from "../dtos/userDtos.js";
import { validateRequestBody } from "../middlewares/requestBodyValidationMiddleware.js";
import { CreateRequest } from "./types/Request/genericRequests.js";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.post(
  "/",
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

export default userRouter;  