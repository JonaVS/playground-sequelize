import { Request, Response, Router } from "express";
import { CreateUserDTO, UserLoginDTO } from "../dtos/userDtos.js";
import { validateRequestBody } from "../middlewares/requestBodyValidationMiddleware.js";
import { CreateRequest, GetByIdRequest, LoginRequest } from "./types/Request/genericRequests.js";
import * as userController from "../controllers/userController.js";
import { validateRequestNumIdParam } from "../middlewares/requestNumIdParamValidationMiddleware.js";

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

/*
  Endpoint to test eager-loading of a model with relations/associations
  This gets all users with their created todos.
*/
userRouter.get("/users-todos", async (req: Request, res: Response) => {
  const result = await userController.getUsersAndTodos();

  if (!result.success) {
    res
      .status(500)
      .json({ error: "An error ocurred while fetching users and todos" });
  } else {
    res.status(200).json(result.data);
  }
});

/*
  Endpoint to test lazy-loading of a model with relations/associations
  This gets all the todos for the specified user (via userId).
*/
userRouter.get(
  "/:id/todos",
  validateRequestNumIdParam,
  async (req: GetByIdRequest, res: Response) => {
    const userId = Number(req.params.id);
    const result = await userController.getUserTodos(userId);

    if (!result.success) {
      res
        .status(500)
        .json({ error: "An error ocurred while fetching the specified user todos" });
    } else {
      if (!result.data) {
        res.status(400).json({
          error: "Bad Request: The provided Id is invalid",
        });
      } else {
        res.status(200).json(result.data);
      }
    }
  }
);

export default userRouter;  