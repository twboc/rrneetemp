/*
  Warnings:

  - You are about to drop the column `created_at` on the `query_variant_result` table. All the data in the column will be lost.
  - You are about to drop the column `domain` on the `query_variant_result` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `query_variant_result` table. All the data in the column will be lost.
  - Added the required column `description` to the `query_variant_result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `query_variant_result` table without a default value. This is not possible if the table is not empty.
  - Made the column `checked_at` on table `query_variant_result` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "query_variant_result" DROP COLUMN "created_at",
DROP COLUMN "domain",
DROP COLUMN "status",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "checked_at" SET NOT NULL;
