-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "ticket_system";

-- CreateTable
CREATE TABLE "ticket_system"."categories" (
    "category_id" SERIAL NOT NULL,
    "category" VARCHAR(36) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "ticket_system"."tickets" (
    "ticket_id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "priority" VARCHAR(10),
    "status" VARCHAR(10) NOT NULL,
    "Category_id" INTEGER,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "assignee" VARCHAR(36),
    "customer" VARCHAR(36) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("ticket_id")
);

-- AddForeignKey
ALTER TABLE "ticket_system"."tickets" ADD CONSTRAINT "tickets_Category_id_fkey" FOREIGN KEY ("Category_id") REFERENCES "ticket_system"."categories"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION;
