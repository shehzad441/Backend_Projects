import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";
const TOKEN_EXPIRATION = "1h";

interface AuthRequestBody {
  email?: string;
  password?: string;
}

router.post("/register", (req: Request<unknown, unknown, AuthRequestBody>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const hashed = bcrypt.hashSync(password, 10);

  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashed],
    function (err) {
      if (err) {
        return res.status(400).json({ error: "User already exists" });
      }
      return res.json({ id: this.lastID, email });
    },
  );
});

router.post("/login", (req: Request<unknown, unknown, AuthRequestBody>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Failed to query user" });
    }

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });

    res.json({ token });
  });
});

export default router;

