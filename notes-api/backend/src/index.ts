import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/notes", notesRouter);

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
