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

    CONSTRAINT "user_organisation_pkey" PRIMARY KEY ("user_id","organisation_id")
);

-- AddForeignKey
ALTER TABLE "user_organisation" ADD CONSTRAINT "user_organisation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_organisation" ADD CONSTRAINT "user_organisation_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
