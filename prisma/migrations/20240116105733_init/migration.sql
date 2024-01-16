/*
  Warnings:

  - You are about to drop the column `position` on the `query_variant_order` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `query_variant_order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "query_variant_order" DROP COLUMN "position",
DROP COLUMN "url";
