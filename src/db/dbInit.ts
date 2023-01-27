import Todo from "../models/Todo.js";
import User from "../models/User.js";

export const initDbConnection = async (): Promise<boolean> => {
  let success = false;
  try {
    await Promise.all([Todo.sync({ alter: true }), User.sync({ alter: true })])
    success = true;
    console.log("Database connection and synchronization has been completed successfully");
  } catch (error) {
    console.error("An error occurred while connecting and synchronizing with the database", error);
  }

  return success;
};
