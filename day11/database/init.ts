import "dotenv/config";
import { Client } from "pg";
import process from "node:process";

export const client = new Client({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

async function connect_db() {
    try{
        await client.connect();
    } catch(err){
        console.error(err);
    }
}

connect_db();