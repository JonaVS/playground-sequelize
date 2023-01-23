import express from "express";
import { getHelloMessageController } from "./controllers/helloWorldController.js";
import { initDbConnection } from "./db/dbInit.js";

const PORT = 5000;
const app = express();

app.use(express.json());

app.get("/", getHelloMessageController);

const dbConnectionSuccess = await initDbConnection();

if (dbConnectionSuccess) {
  app.listen(PORT);
  console.log(`Playground is running on port: ${PORT}`);
} else {
  console.error("Error connecting to the database:");
  console.log("The server will not start");
}
