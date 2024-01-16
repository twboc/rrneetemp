/*
  Warnings:

  - Added the required column `query_variant_order_id` to the `query_variant_result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "query_variant_result" ADD COLUMN     "checked_at" TIMESTAMP(3),
ADD COLUMN     "query_variant_order_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "query_variant_order" (
    "id" UUID NOT NULL,
    "query_variant_id" UUID NOT NULL,
    "domain" TEXT NOT NULL,
    "domain_order_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checked_at" TIMESTAMP(3),
    "position" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'automatic',

    CONSTRAINT "query_variant_order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "query_variant_order" ADD CONSTRAINT "query_variant_order_query_variant_id_fkey" FOREIGN KEY ("query_variant_id") REFERENCES "query_variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "query_variant_result" ADD CONSTRAINT "query_variant_result_query_variant_order_id_fkey" FOREIGN KEY ("query_variant_order_id") REFERENCES "query_variant_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
