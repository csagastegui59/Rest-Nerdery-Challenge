/*
  Warnings:

  - A unique constraint covering the columns `[account_id,comment_id,post_id]` on the table `dislikes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account_id,comment_id,post_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "dislikes_account_id_comment_id_post_id_key" ON "dislikes"("account_id", "comment_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_account_id_comment_id_post_id_key" ON "likes"("account_id", "comment_id", "post_id");
