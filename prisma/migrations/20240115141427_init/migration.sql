/*
  Warnings:

  - Added the required column `domain_order_id` to the `query_variant_result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "query_variant_result" ADD COLUMN     "domain_order_id" TEXT NOT NULL;
