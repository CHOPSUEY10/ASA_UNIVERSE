/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "user_phone_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "passwordHash",
DROP COLUMN "phone",
DROP COLUMN "role",
ALTER COLUMN "email" SET NOT NULL;
