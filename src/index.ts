import { initDbConnection } from "./db/dbInit.js";
import express from "express";
import { getHelloMessageController } from "./controllers/helloWorldController.js";
import router from "./routes/index.js";

const dbConnectionSuccess = await initDbConnection();

const PORT = 5000;
const app = express();

app.use(express.json());

app.get("/", getHelloMessageController);

app.use('/api', router)

if (dbConnectionSuccess) {
  app.listen(PORT);
  console.log(`Playground is running on port: ${PORT}`);
} else {
  console.log("The server could not be initialized");
}
