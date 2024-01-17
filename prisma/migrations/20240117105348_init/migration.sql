-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "given_name" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "salt" TEXT NOT NULL DEFAULT '',
    "password_hash" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organisation" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "organisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_organisation" (
    "user_id" UUID NOT NULL,
    "organisation_id" UUID NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "user_organisation_pkey" PRIMARY KEY ("user_id","organisation_id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_organisation" (
    "client_id" UUID NOT NULL,
    "organisation_id" UUID NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "client_organisation_pkey" PRIMARY KEY ("client_id","organisation_id")
);

-- CreateTable
CREATE TABLE "google_token_data" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_token" TEXT NOT NULL,
    "expires_in" INTEGER NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "token_type" TEXT NOT NULL,
    "id_token" TEXT NOT NULL,

    CONSTRAINT "google_token_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "google_id_token" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "iss" TEXT NOT NULL,
    "azp" TEXT NOT NULL,
    "aud" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL,
    "at_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "given_name" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "iat" INTEGER NOT NULL,
    "exp" INTEGER NOT NULL,

    CONSTRAINT "google_id_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domain" (
    "id" UUID NOT NULL,
    "domain" TEXT NOT NULL,
    "tombstone" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "domain_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "domain_permission" (
    "id" UUID NOT NULL,
    "domain_id" UUID NOT NULL,
    "organisation_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "access" TEXT NOT NULL,

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
CREATE TABLE "query_variant_order" (
    "id" UUID NOT NULL,
    "query_variant_id" UUID NOT NULL,
    "domain" TEXT NOT NULL,
    "domain_order_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checked_at" TIMESTAMP(3),
    "type" TEXT NOT NULL DEFAULT 'automatic',

    CONSTRAINT "query_variant_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "query_variant_result" (
    "id" UUID NOT NULL,
    "query_variant_id" UUID NOT NULL,
    "query_variant_order_id" UUID NOT NULL,
    "domain_order_id" TEXT NOT NULL,
    "checked_at" TIMESTAMP(3) NOT NULL,
    "position" INTEGER NOT NULL,
    "domain" TEXT NOT NULL,
    "with_subdomain" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'automatic',

    CONSTRAINT "query_variant_result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user_organisation" ADD CONSTRAINT "user_organisation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_organisation" ADD CONSTRAINT "user_organisation_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_organisation" ADD CONSTRAINT "client_organisation_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_organisation" ADD CONSTRAINT "client_organisation_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domain_order" ADD CONSTRAINT "domain_order_domain_id_fkey" FOREIGN KEY ("domain_id") REFERENCES "domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "query_variant_order" ADD CONSTRAINT "query_variant_order_query_variant_id_fkey" FOREIGN KEY ("query_variant_id") REFERENCES "query_variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "query_variant_result" ADD CONSTRAINT "query_variant_result_query_variant_id_fkey" FOREIGN KEY ("query_variant_id") REFERENCES "query_variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "query_variant_result" ADD CONSTRAINT "query_variant_result_query_variant_order_id_fkey" FOREIGN KEY ("query_variant_order_id") REFERENCES "query_variant_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
