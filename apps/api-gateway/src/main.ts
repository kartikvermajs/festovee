import express from "express";
import proxy from "express-http-proxy";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import morgan from "morgan";
// import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
// import axios from "axios";
import cors from "cors";
import { Request } from "express";
import initializeSiteConfig from "./libs/initializeSiteConfig";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);

//Apply rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: (req: any) => (req.user ? 1000 : 100),
//   message: { error: "Too many request, please try again later!" },
//   standardHeaders: true,
//   legacyHeaders: true,
//   keyGenerator: (req: any) => req.ip,
// });

// app.use(limiter);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: (req: any) => (req.user ? 1000 : 100),
    message: { error: "Too many requests, please try again later!" },
    standardHeaders: true,
    legacyHeaders: true,
    keyGenerator: (req: Request) => ipKeyGenerator(req as any),
  })
);

app.get("/gateway-health", (req, res) => {
  res.send({ message: "Welcome to api-gateway!" });
});

app.use("/product", proxy("http://localhost:6002"));
app.use("/", proxy("http://localhost:6001"));

const port = Number(process.env.PORT) || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);

  try {
    initializeSiteConfig();
    console.log("Site config initialized successfully!");
  } catch (error) {
    console.error("error", console.error);
  }
});
server.on("error", console.error);
