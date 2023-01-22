import { sequelizeConnection } from "./config.js";
import Todo from "../models/Todo.js";

export const initDbConnection = async (): Promise<void> => {
  try {
    await sequelizeConnection.authenticate();
    await Todo.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
