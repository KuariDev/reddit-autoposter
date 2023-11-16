/*
  Warnings:

  - You are about to drop the column `isStopped` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postEverySeconds` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `subbreditName` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "isStopped",
DROP COLUMN "postEverySeconds",
DROP COLUMN "subbreditName",
ADD COLUMN     "postInSeconds" INTEGER,
ADD COLUMN     "subbreditNames" TEXT[];
