-- CreateEnum
CREATE TYPE "public"."TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "status" "public"."TaskStatus" NOT NULL DEFAULT 'TODO';
