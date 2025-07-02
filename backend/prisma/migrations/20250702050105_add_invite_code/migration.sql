/*
  Warnings:

  - A unique constraint covering the columns `[inviteCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inviteCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "inviteCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_inviteCode_key" ON "User"("inviteCode");
