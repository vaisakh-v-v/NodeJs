import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { createHash } from "node:crypto";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({connectionString});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({adapter});


async function main() {
    await prisma.categories.createMany({
        data: [
            {category: "Billing and Payments"},
            {category: "Techinical Support and Bugs"},
            {category: "Accounting and Access Management"},
            {category: "General Inquiries"},
            {category: "Feature Requests"},
        ],
    });

    await prisma.users.createMany({
        data:[
            {
                name: "vaisakh",
                email: "aby@example.com",
                hashed_password: createHash("sha256")
                    .update("some password")
                    .digest("base64"),
                role: "agent",
            },
            {
                name: "admin",
                email: "admin@example.com",
                hashed_password: createHash("sha256")
                    .update("some password")
                    .digest("base64"),
                role: "administrator"
            },
            {
                name: "Thanos",
                email: "thanos@gmail.com",
                hashed_password: createHash("sha256")
                    .update("some password")
                    .digest("base64"),
                    role: "customer"
            }
        ],
    });

    await prisma.tickets.createMany({
        data: [
            {
                title: "some title",
                description: "some description",
                status: "pending",
                assignee_id: 1,
                customer_id: 3,

            }
        ]
    })

}

main()
    .then(async () =>{
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) =>{
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });