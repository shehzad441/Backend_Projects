import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  id: number;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.header("Authorization");

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = header.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    if (typeof decoded.id !== "number") {
      return res.status(400).json({ error: "Invalid token payload" });
    }

    req.user = decoded;
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

export default authMiddleware;

