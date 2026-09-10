import jwt from "jsonwebtoken";
import type { Response, NextFunction } from "express";
import "dotenv/config";
import {type AuthRequest, HTTPError, type User } from "../types.ts";

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new HTTPError("authorization failed. token not found", 403);
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      throw new HTTPError("invalid or expired token", 403);
    }

    req.user = decoded as Omit<User, "hashed_password">;
    next();
  });
}

export function permit(
  permittedRoles: string[] = ["administrator", "agent", "customer"],
) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user } = req;

    if (user && permittedRoles.includes(user.role)) {
      next();
    } else {
      throw new HTTPError("forbidden access", 403);
    }
  };
}

export function permitAll() {
  return permit();
}

