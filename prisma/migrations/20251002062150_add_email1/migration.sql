/*
  Warnings:

  - You are about to drop the column `userId` on the `Member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail,groupId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Member" DROP CONSTRAINT "Member_userId_fkey";

-- DropIndex
DROP INDEX "public"."Member_userId_groupId_key";

-- AlterTable
ALTER TABLE "public"."Member" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Member_userEmail_groupId_key" ON "public"."Member"("userEmail", "groupId");

-- AddForeignKey
ALTER TABLE "public"."Member" ADD CONSTRAINT "Member_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "public"."User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
