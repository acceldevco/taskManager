-- CreateEnum
CREATE TYPE "public"."Visibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "public"."ActivityAction" AS ENUM ('CREATED', 'MOVED', 'UPDATED', 'DELETED', 'COMMENTED');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "name" TEXT;

-- CreateTable
CREATE TABLE "public"."Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER NOT NULL,
    "memberCount" INTEGER NOT NULL,
    "visibility" "public"."Visibility" NOT NULL DEFAULT 'PRIVATE',
    "coverImage" TEXT,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Member" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Column" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "assignedToId" INTEGER,
    "columnId" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3),
    "priority" "public"."Priority" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Label" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TaskLabel" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "labelId" TEXT NOT NULL,

    CONSTRAINT "TaskLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "taskId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Activity" (
    "id" TEXT NOT NULL,
    "action" "public"."ActivityAction" NOT NULL,
    "byId" INTEGER NOT NULL,
    "taskId" TEXT,
    "fromColumn" TEXT,
    "toColumn" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Group_createdAt_idx" ON "public"."Group"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Member_userId_groupId_key" ON "public"."Member"("userId", "groupId");

-- CreateIndex
CREATE INDEX "Column_groupId_order_idx" ON "public"."Column"("groupId", "order");

-- CreateIndex
CREATE INDEX "Task_columnId_idx" ON "public"."Task"("columnId");

-- CreateIndex
CREATE INDEX "Task_dueDate_idx" ON "public"."Task"("dueDate");

-- CreateIndex
CREATE UNIQUE INDEX "Label_name_key" ON "public"."Label"("name");

-- CreateIndex
CREATE INDEX "TaskLabel_labelId_idx" ON "public"."TaskLabel"("labelId");

-- CreateIndex
CREATE UNIQUE INDEX "TaskLabel_taskId_labelId_key" ON "public"."TaskLabel"("taskId", "labelId");

-- CreateIndex
CREATE INDEX "Comment_taskId_idx" ON "public"."Comment"("taskId");

-- CreateIndex
CREATE INDEX "Activity_byId_idx" ON "public"."Activity"("byId");

-- CreateIndex
CREATE INDEX "Activity_taskId_idx" ON "public"."Activity"("taskId");

-- AddForeignKey
ALTER TABLE "public"."Group" ADD CONSTRAINT "Group_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Member" ADD CONSTRAINT "Member_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Column" ADD CONSTRAINT "Column_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "public"."Column"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TaskLabel" ADD CONSTRAINT "TaskLabel_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TaskLabel" ADD CONSTRAINT "TaskLabel_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "public"."Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_byId_fkey" FOREIGN KEY ("byId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
