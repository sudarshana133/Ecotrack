-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "countryCode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "timeZoneId" TEXT NOT NULL DEFAULT '';
