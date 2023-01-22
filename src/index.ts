import express from "express";
import { getHelloMessageController } from "./controllers/helloWorldController.js";
import { initDbConnection } from "./db/dbInit.js";

const PORT = 5000;
const app = express();

app.use(express.json());

app.get("/", getHelloMessageController);

await initDbConnection();
app.listen(PORT);
console.log(`Playground is running on port: ${PORT}`);
