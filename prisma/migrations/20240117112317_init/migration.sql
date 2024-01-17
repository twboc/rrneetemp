/*
  Warnings:

  - You are about to drop the column `domain` on the `query_variant_result` table. All the data in the column will be lost.
  - You are about to drop the column `with_subdomain` on the `query_variant_result` table. All the data in the column will be lost.
  - Added the required column `domain_full` to the `query_variant_result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domain_secondary` to the `query_variant_result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "query_variant_result" DROP COLUMN "domain",
DROP COLUMN "with_subdomain",
ADD COLUMN     "domain_full" TEXT NOT NULL,
ADD COLUMN     "domain_secondary" TEXT NOT NULL;
