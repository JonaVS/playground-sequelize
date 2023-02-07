import { Request, Response, Router } from "express";
import * as tagController from "../controllers/tagController.js";

const tagRouter = Router();

tagRouter.get("/", async (req: Request, res: Response) => {
  const result = await tagController.getAll();
  if (!result.success) {
    res
      .status(500)
      .json({ error: "An error ocurred while fetching the Tag entities" });
  } else {
    res.status(200).json(result.data);
  }
});

export default tagRouter;
