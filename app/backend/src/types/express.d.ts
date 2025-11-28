import type { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: (JwtPayload & { id: number; email: string }) | undefined;
    userId?: number;
  }
}

export {};

