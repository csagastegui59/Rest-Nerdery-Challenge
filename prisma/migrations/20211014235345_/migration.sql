/*
  Warnings:

  - A unique constraint covering the columns `[id,draft]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "posts_id_draft_key" ON "posts"("id", "draft");
