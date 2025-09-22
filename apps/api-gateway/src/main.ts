import express from "express";
import proxy from "express-http-proxy";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
// import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
// import axios from "axios";
import cors from "cors";
import { Request } from "express";

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
    keyGenerator: (req: Request): string => {
      // Use IPv4/IPv6-safe string
      return req.ip || req.connection.remoteAddress || "";
    },
  })
);

app.get("/gateway-health", (req, res) => {
  res.send({ message: "Welcome to api-gateway!" });
});

app.use("/", proxy("http://localhost:6001"));

const port = Number(process.env.PORT) || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
