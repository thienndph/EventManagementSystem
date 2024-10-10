/*
  Warnings:

  - The `status` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER;
