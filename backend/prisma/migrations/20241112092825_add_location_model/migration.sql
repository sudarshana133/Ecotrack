/*
  Warnings:

  - You are about to drop the column `userId` on the `Device` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_userId_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "userId",
ALTER COLUMN "locationId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "userId" INTEGER,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("locationId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
