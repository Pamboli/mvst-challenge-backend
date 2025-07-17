/*
  Warnings:

  - A unique constraint covering the columns `[normalizedName]` on the table `coffees` will be added. If there are existing duplicate values, this will fail.
  - Made the column `normalizedName` on table `coffees` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "coffees" ALTER COLUMN "normalizedName" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "coffees_normalizedName_key" ON "coffees"("normalizedName");
