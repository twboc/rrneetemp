/*
  Warnings:

  - Added the required column `position` to the `user_organisation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_organisation" ADD COLUMN     "position" TEXT NOT NULL;
