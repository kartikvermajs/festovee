import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import swaggerUi from "swagger-ui-express";
import swaggerDocument = require("./swagger-output.json");
import { errorMiddleware } from "@packages/error-handler/error-middleware";
import router from "./routes/product.routes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send({ message: "Hello Product API" });
});

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.get("/docs-json", (req, res) => {
//   res.json(swaggerDocument);
// });


app.use("/api", router);
app.use(errorMiddleware);

const port = Number(process.env.PORT) || 6002;
const server = app.listen(port, () => {
  console.log(`Product service is running at http://localhost:${port}/api`);
  console.log(`swagger docs available at http://localhost:${port}/api`);
});

server.on("error", (err) => {
  console.log("Server Error:", err);
});
