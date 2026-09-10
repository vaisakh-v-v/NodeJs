/*
  Warnings:

  - You are about to drop the column `assignee` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `customer` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ticket_system"."tickets" DROP COLUMN "assignee",
DROP COLUMN "customer",
ADD COLUMN     "assignee_id" INTEGER,
ADD COLUMN     "customer_id" INTEGER;

-- AlterTable
ALTER TABLE "ticket_system"."users" ADD COLUMN     "role" VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE "ticket_system"."tickets" ADD CONSTRAINT "tickets_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "ticket_system"."users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket_system"."tickets" ADD CONSTRAINT "tickets_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "ticket_system"."users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;
