import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employee.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send({ status: "ok", message: "Employee API running" });
});

app.use("/api/employees", employeeRoutes);

app.use(errorHandler);

export default app;
