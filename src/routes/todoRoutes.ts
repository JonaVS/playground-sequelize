import { Response, Router } from "express";
import { CreateTodoDTO } from "../dtos/todoDtos.js";
import { TypedRequestBody } from "./types/requestBody.js";
import * as todoController from "../controllers/todoController.js";
import { validateRequestBody } from "../middlewares/requestBodyValidationMiddleware.js";

const todoRouter = Router();

todoRouter.post(
  "/", validateRequestBody,
  async (req: TypedRequestBody<CreateTodoDTO>, res: Response) => {
    const createdTodo = await todoController.create(req.body);

    if (!createdTodo) {
      res
        .status(500)
        .json({ error: "An error ocurred while creating the todo entity" });
    } else {
      res.status(200).json(createdTodo);
    }
  }
);

export default todoRouter;
