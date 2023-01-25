import { Request, Response, Router } from "express";
import { CreateTodoDTO } from "../dtos/todoDtos.js";
import * as todoController from "../controllers/todoController.js";
import { validateRequestBody } from "../middlewares/requestBodyValidationMiddleware.js";
import { CreateRequest, GetByIdRequest } from "./types/Request/genericRequests.js";
import { BaseParam } from "./types/BaseParam.js";
import { validateRequestNumIdParam } from "../middlewares/requestNumIdParamValidationMiddleware.js";

const todoRouter = Router();

todoRouter.get("/", async (req: Request, res: Response) => {
  const result = await todoController.getAll();
  if (!result.success) {
    res
      .status(500)
      .json({ error: "An error ocurred while fetching the todo entities" });
  }else {
    res.status(200).json(result.data);
  }
});

todoRouter.get("/:id", validateRequestNumIdParam, async (req: GetByIdRequest<BaseParam>, res: Response) => {
  const todoId = Number(req.params.id)
  const result = await todoController.getById(todoId);
  if (!result.success) {
    res
      .status(500)
      .json({ error: "An error ocurred while fetching the todo entity" });
  }else {
    res.status(200).json(result.data);
  }
});

todoRouter.post(
  "/",
  validateRequestBody,
  async (req: CreateRequest<CreateTodoDTO>, res: Response) => {
    const result = await todoController.create(req.body);

    if (!result.success) {
      res
        .status(500)
        .json({ error: "An error ocurred while creating the todo entity" });
    } else {
      res.status(200).json(result.data);
    }
  }
);

export default todoRouter;
