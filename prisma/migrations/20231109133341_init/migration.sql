/*
  Warnings:

  - Added the required column `access` to the `domain_permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "domain_permission" ADD COLUMN     "access" TEXT NOT NULL;
