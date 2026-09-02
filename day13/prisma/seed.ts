import "dotenv/config";
import {Pool} from "pg";
import {PrismaPg} from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({connectionString});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({adapter});

async function main() {
    await prisma.categories.createMany({
        data: [
            {category: "Billing & Payments"},
            {category: "Technical Support @ Bugs"},
            {category: "Account & Access Management"},
            {category: "Genereal Inquiries"},
            {category: "Feature Requests"},
        ],
    });
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
})