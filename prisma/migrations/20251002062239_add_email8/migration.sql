/*
  Warnings:

  - Made the column `userEmail` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Member" ALTER COLUMN "userEmail" SET NOT NULL;
