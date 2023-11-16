-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "subbreditName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "text" TEXT,
    "postEverySeconds" INTEGER NOT NULL,
    "isStopped" BOOLEAN NOT NULL DEFAULT false,
    "accountId" TEXT NOT NULL,
    "lastPostAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
