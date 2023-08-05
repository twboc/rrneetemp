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

-- AddForeignKey
ALTER TABLE "client_organisation" ADD CONSTRAINT "client_organisation_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_organisation" ADD CONSTRAINT "client_organisation_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
