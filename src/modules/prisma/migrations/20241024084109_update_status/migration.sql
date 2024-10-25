/*
  Warnings:

  - The `status` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AdminStatus" AS ENUM ('ACTIVE', 'DELETE');

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "status",
ADD COLUMN     "status" "AdminStatus" NOT NULL DEFAULT 'ACTIVE';
