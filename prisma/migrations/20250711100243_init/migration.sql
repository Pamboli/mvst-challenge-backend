-- CreateEnum
CREATE TYPE "CoffeeType" AS ENUM ('ARABIC', 'ROBUSTA');

-- CreateTable
CREATE TABLE "coffees" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "CoffeeType" NOT NULL,
    "price" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "coffees_pkey" PRIMARY KEY ("id")
);
