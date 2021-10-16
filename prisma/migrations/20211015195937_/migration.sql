/*
  Warnings:

  - Made the column `is_moderator` on table `accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "is_moderator" SET NOT NULL,
ALTER COLUMN "is_moderator" SET DEFAULT false;
