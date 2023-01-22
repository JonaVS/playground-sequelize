import { Request, Response } from "express";

export const getHelloMessageController = async (req: Request, res: Response):Promise<void> => {
    res.json('Hello!, this is just a playground for Sequelize ORM stuff :D')
} 