-- CreateTable
CREATE TABLE "domain" (
    "id" UUID NOT NULL,
    "domain" TEXT NOT NULL,

    CONSTRAINT "domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domain_permission" (
    "id" UUID NOT NULL,
    "domain_id" UUID NOT NULL,
    "organisation_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "domain_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "query" (
    "id" UUID NOT NULL,
    "domain_id" UUID NOT NULL,
    "query" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "query_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "query_variant" (
    "id" UUID NOT NULL,
    "query_id" UUID NOT NULL,
    "search_engine" TEXT NOT NULL,
    "device" TEXT NOT NULL,

    CONSTRAINT "query_variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "query_variant_result" (
    "id" UUID NOT NULL,
    "query_variant_id" UUID NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "position" INTEGER NOT NULL,
    "domain" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "query_variant_result_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "domain_permission" ADD CONSTRAINT "domain_permission_domain_id_fkey" FOREIGN KEY ("domain_id") REFERENCES "domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domain_permission" ADD CONSTRAINT "domain_permission_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domain_permission" ADD CONSTRAINT "domain_permission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "query" ADD CONSTRAINT "query_domain_id_fkey" FOREIGN KEY ("domain_id") REFERENCES "domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "query_variant" ADD CONSTRAINT "query_variant_query_id_fkey" FOREIGN KEY ("query_id") REFERENCES "query"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "query_variant_result" ADD CONSTRAINT "query_variant_result_query_variant_id_fkey" FOREIGN KEY ("query_variant_id") REFERENCES "query_variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
