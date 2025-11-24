/*
  Warnings:

  - You are about to drop the column `assignedToId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_assignedToId_fkey";

-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "assignedToId",
ADD COLUMN     "assignedToMemberId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_assignedToMemberId_fkey" FOREIGN KEY ("assignedToMemberId") REFERENCES "public"."Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
