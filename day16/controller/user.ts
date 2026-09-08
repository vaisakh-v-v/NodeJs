import { type Request, type Response } from "express";
import { type AuthRequest, HTTPError, type User } from "../types.ts";
import { createHash } from "crypto";
import "dotenv/config";
import { addUser, checkUser } from "../database/user.ts";
import jwt from "jsonwebtoken";

export async function handleGetUser(req: AuthRequest, res: Response) {
  res.json({
    user: req.user,
  });
}

export async function handleCreateUser(req: Request, res: Response) {
  const requestBody = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!requestBody) {
    throw new HTTPError("invalid user", 401);
  }
  if (!requestBody.name) {
    throw new HTTPError("username not found", 401);
  }

  if (!requestBody.email) {
    throw new HTTPError("email not found", 401);
  }

  if (!emailRegex.test(requestBody.email)) {
    throw new HTTPError("invalid email address", 401);
  }

  if (!requestBody.password) {
    throw new HTTPError("password not found", 401);
  }

  const user: Omit<User, "user_id"> = {
    name: requestBody.name,
    email: requestBody.email,
    hashed_password: createHash("sha256")
      .update(requestBody.password)
      .digest("base64"),
  };
  const newUser = await addUser(user);

  res.json({
    user_id: newUser.user_id,
    name: newUser.name,
    email: newUser.email,
  });
}

export async function handleUserLogin(req: Request, res: Response) {
  const requestBody = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!requestBody) {
    throw new HTTPError("invalid user", 401);
  }

  if (!requestBody.email) {
    throw new HTTPError("email not found", 401);
  }

  if (!emailRegex.test(requestBody.email)) {
    throw new HTTPError("invalid email address", 401);
  }

  if (!requestBody.password) {
    throw new HTTPError("password not found", 401);
  }
  const user: Omit<User, "name" | "user_id"> = {
    email: requestBody.email,
    hashed_password: createHash("sha256").update(requestBody.password).digest("base64"),
  };

  const response = await checkUser(user);
  const payload = {
    user_id: response.user_id,
    name: response.name,
    email: response.email,
  };

  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret as string,{
    expiresIn: "10m",
  });
  res.json({
    user: payload,
    token: token,
  });
}
