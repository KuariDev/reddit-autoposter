-- CreateTable
CREATE TABLE "CreatedPost" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "CreatedPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CreatedPost" ADD CONSTRAINT "CreatedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
