import { Request, Response, Router } from "express";
import { CreateTodoDTO, UpdateTodoDTO } from "../dtos/todoDtos.js";
import * as todoController from "../controllers/todoController.js";
import { validateRequestBody } from "../middlewares/requestBodyValidationMiddleware.js";
import { CreateRequest, GetByIdRequest, DeleteByIdRequest, UpdateByIdRequest } from "./types/Request/genericRequests.js";
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

todoRouter.get("/:id", validateRequestNumIdParam, async (req: GetByIdRequest, res: Response) => {
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

todoRouter.delete(
  "/:id",
  validateRequestNumIdParam,
  async (req: DeleteByIdRequest, res: Response) => {
    const todoId = Number(req.params.id);
    const result = await todoController.deleteById(todoId);
    if (!result.success) {
      res
        .status(500)
        .json({
          error: "An error ocurred while deleting the specified todo entity",
        });
    } else {
      if (result.data === 0) {
        res.status(400).json({
          error: "Bad Request: The provided Id is invalid",
        });
      } else {
        res.status(200).json(result.data);
      }
    }
  }
);

todoRouter.put(
  "/:id",
  validateRequestNumIdParam,
  validateRequestBody,
  async (req: UpdateByIdRequest<UpdateTodoDTO>, res: Response) => {
    const todoId = Number(req.params.id);
    const result = await todoController.updateById(todoId, req.body);
    if (!result.success) {
      res.status(500).json({
        error: "An error ocurred while updating the specified todo entity",
      });
    } else {
      if (!result.data) {
        res.status(400).json({
          error: "Bad Request: The provided Id doesnt exist",
        });
      } else {
        res.status(200).json(result.data);
      }
    }
  }
);

export default todoRouter;
