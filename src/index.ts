import express from "express";
import { getHelloMessageController } from "./controllers/helloWorldController.js";

const PORT = 5000;
const app = express();

app.use(express.json());

app.get("/", getHelloMessageController);

app.listen(PORT);

console.log(`Playground is running on port: ${PORT}`);
