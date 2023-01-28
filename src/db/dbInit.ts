import { sequelizeConnection } from "./config.js";

export const initDbConnection = async (): Promise<boolean> => {
  let success = false;
  try {
    await sequelizeConnection.sync({alter: true})
    success = true;
    console.log("Database connection and synchronization has been completed successfully");
  } catch (error) {
    console.error("An error occurred while connecting and synchronizing with the database", error);
  }

  return success;
};
