-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "is_public_email" SET DEFAULT true,
ALTER COLUMN "is_public_name" SET DEFAULT true;

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "num_likes" SET DEFAULT 0,
ALTER COLUMN "num_dislikes" SET DEFAULT 0,
ALTER COLUMN "draft" SET DEFAULT false;

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "num_likes" SET DEFAULT 0,
ALTER COLUMN "num_dislikes" SET DEFAULT 0,
ALTER COLUMN "draft" SET DEFAULT false;
