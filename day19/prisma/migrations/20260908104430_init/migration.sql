-- CreateTable
CREATE TABLE "ticket_system"."users" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(36) NOT NULL,
    "email" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "ticket_system"."users"("email");
