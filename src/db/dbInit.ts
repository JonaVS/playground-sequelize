import { sequelizeConnection } from "./config.js";
import Todo from "../models/Todo.js";

export const initDbConnection = async (): Promise<boolean> => {
  let success = false
  try {
    await sequelizeConnection.authenticate();
    await Todo.sync();
    success = true
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  return success
};
