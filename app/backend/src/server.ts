import express, { Request, Response } from "express";
import cors from "cors";
import authMiddleware from "./middleware/auth";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todos";

const PORT = Number(process.env.PORT) || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const app = express();

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("API is running");
});

app.get("/protected", authMiddleware, (req: Request, res: Response) => {
  res.json({ message: "You accessed a protected route", user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

