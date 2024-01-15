-- CreateTable
CREATE TABLE "domain_order" (
    "id" UUID NOT NULL,
    "domain_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "type" TEXT NOT NULL DEFAULT 'automatic',

    CONSTRAINT "domain_order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "domain_order" ADD CONSTRAINT "domain_order_domain_id_fkey" FOREIGN KEY ("domain_id") REFERENCES "domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
