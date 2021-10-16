/*
  Warnings:

  - A unique constraint covering the columns `[account_id,comment_id]` on the table `dislikes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account_id,post_id]` on the table `dislikes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account_id,comment_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account_id,post_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account_id,comment_id]` on the table `reports` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account_id,post_id]` on the table `reports` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "dislikes_account_id_comment_id_post_id_key";

-- DropIndex
DROP INDEX "likes_account_id_comment_id_post_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "dislikes_account_id_comment_id_key" ON "dislikes"("account_id", "comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "dislikes_account_id_post_id_key" ON "dislikes"("account_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_account_id_comment_id_key" ON "likes"("account_id", "comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_account_id_post_id_key" ON "likes"("account_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "reports_account_id_comment_id_key" ON "reports"("account_id", "comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "reports_account_id_post_id_key" ON "reports"("account_id", "post_id");
