/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VerificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."Activity" DROP CONSTRAINT "Activity_byId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Group" DROP CONSTRAINT "Group_createdById_fkey";

-- DropForeignKey
ALTER TABLE "public"."Member" DROP CONSTRAINT "Member_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_assignedToId_fkey";

-- DropForeignKey
ALTER TABLE "public"."VerificationToken" DROP CONSTRAINT "VerificationToken_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Activity" ALTER COLUMN "byId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Comment" ALTER COLUMN "authorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Group" ALTER COLUMN "createdById" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Member" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Task" ALTER COLUMN "assignedToId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "public"."VerificationToken" DROP CONSTRAINT "VerificationToken_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "VerificationToken_id_seq";

-- AddForeignKey
ALTER TABLE "public"."VerificationToken" ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Group" ADD CONSTRAINT "Group_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_byId_fkey" FOREIGN KEY ("byId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
