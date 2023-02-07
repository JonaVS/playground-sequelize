import { Router } from "express";
import tagRouter from "./tagRoutes.js";
import todoRouter from "./todoRoutes.js";
import userRouter from "./userRoutes.js";

const router = Router();

router.use("/todo", todoRouter);
router.use("/user", userRouter);
router.use("/tag", tagRouter);

export default router;
