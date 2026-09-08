import { HTTPError, type User } from "../types.ts";
import prisma from "./init.ts";

export async function addUser(user:Omit<User, "user_id">) {
    try{
        const newUser = prisma.users.create({
            data: {
                name: user.name,
                email: user.email,
                hashed_password: user.hashed_password,
            },
        });
        return newUser;
    } catch(err){
        throw new HTTPError("Invalid user data", 401);
    }
}

export async function checkUser(user:Omit<User, "name" | "user_id">) {
   const response = await prisma.users.findFirst({
    where: {
        email: user.email,
    },
   });
   if(!response){
    throw new HTTPError("user not found", 401);
   }
   if(response.hashed_password !== user.hashed_password){
    throw new HTTPError("incorrect password", 401);
   }
   return response;
}