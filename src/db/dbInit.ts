import { sequelizeConnection } from "./config.js";
import User from "../models/User.js";
import Todo from "../models/Todo.js";
import Tag from "../models/Tag.js";

export const initDbConnection = async (): Promise<boolean> => {
  let success = false;
  try {
    /*
      -Using just sequelizeConnection.sync({alter:true}) doesnt create all tables. Weird issue.
      -Due to the above issue, I decided to use the sync method for each model.
      -As a reminder, sync methods are only for development. For real things migrations are used.
    */ 
    Promise.all([
      await User.sync({ alter: true }),
      await Todo.sync({ alter: true }),
      await Tag.sync({ alter: true }),
    ]);
    success = true;
    console.log("Database connection and synchronization has been completed successfully");
  } catch (error) {
    console.error("An error occurred while connecting and synchronizing with the database", error);
  }

  return success;
};
