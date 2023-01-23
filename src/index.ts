import express from "express";
import router from "./routes/index.js";
import { getHelloMessageController } from "./controllers/helloWorldController.js";
import { initDbConnection } from "./db/dbInit.js";

const PORT = 5000;
const app = express();

app.use(express.json());

app.get("/", getHelloMessageController);

app.use('/api', router)

const dbConnectionSuccess = await initDbConnection();

if (dbConnectionSuccess) {
  app.listen(PORT);
  console.log(`Playground is running on port: ${PORT}`);
} else {
  console.log("The server could not be initialized");
}
