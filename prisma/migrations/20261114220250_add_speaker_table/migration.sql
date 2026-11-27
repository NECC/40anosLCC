/*
  Warnings:

  - You are about to drop the column `isStudent` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `studyYear` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('WORKSHOP', 'TALK');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isStudent",
DROP COLUMN "studyYear",
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "type" "ActivityType" NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speaker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActivityToSpeaker" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ActivityToSpeaker_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ActivityToSpeaker_B_index" ON "_ActivityToSpeaker"("B");

-- AddForeignKey
ALTER TABLE "_ActivityToSpeaker" ADD CONSTRAINT "_ActivityToSpeaker_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToSpeaker" ADD CONSTRAINT "_ActivityToSpeaker_B_fkey" FOREIGN KEY ("B") REFERENCES "Speaker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
