/*
  Warnings:

  - You are about to drop the column `assignedToMemberId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_assignedToMemberId_fkey";

-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "assignedToMemberId";

-- CreateTable
CREATE TABLE "public"."TaskAssignment" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "TaskAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskAssignment_taskId_memberId_key" ON "public"."TaskAssignment"("taskId", "memberId");

-- AddForeignKey
ALTER TABLE "public"."TaskAssignment" ADD CONSTRAINT "TaskAssignment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TaskAssignment" ADD CONSTRAINT "TaskAssignment_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
