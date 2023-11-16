/*
  Warnings:

  - You are about to drop the column `isSended` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "isSended",
ADD COLUMN     "isSent" BOOLEAN NOT NULL DEFAULT false;
