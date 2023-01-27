import { Router } from "express";
import todoRouter from "./todoRoutes.js";
import userRouter from "./userRoutes.js";

const router = Router()

router.use('/todo', todoRouter)
router.use('/user', userRouter)

export default router