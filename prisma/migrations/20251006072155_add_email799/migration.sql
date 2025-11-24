/*
  Warnings:

  - You are about to drop the column `colortask` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Column" ADD COLUMN     "colortask" TEXT;

-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "colortask";
