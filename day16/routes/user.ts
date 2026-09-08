import { Router } from "express";
import {
  handleCreateUser,
  handleGetUser,
  handleUserLogin,
}from "../controller/user.ts"
import { authenticateToken } from "../middleware/auth.ts";


const user = Router();

user.post("/", handleCreateUser);
user.post("/login", handleUserLogin);
user.use(authenticateToken);
user.get("/", handleGetUser);

export default user;
