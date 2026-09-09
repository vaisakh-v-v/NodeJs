import { Router } from "express";
import {
  handleCreateUser,
  handleGetUser,
  handleUserLogin,
}from "../controller/user.ts"
import { authenticateToken, permit, permitAll } from "../middleware/auth.ts";


const user = Router();

user.post("/login", handleUserLogin);
user.use(authenticateToken);
user.post("/", permit(["administrator"]), handleCreateUser);
user.get("/", permitAll(), handleGetUser);
export default user;
                                                           