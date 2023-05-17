-- AlterTable
ALTER TABLE "user" ADD COLUMN     "password_hash" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "salt" TEXT NOT NULL DEFAULT '';
