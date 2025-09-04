/*
  Warnings:

  - A unique constraint covering the columns `[messageId]` on the table `Fragment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Fragment" DROP CONSTRAINT "Fragment_id_fkey";

-- AlterTable
ALTER TABLE "public"."Fragment" ALTER COLUMN "messageId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Fragment_messageId_key" ON "public"."Fragment"("messageId");

-- AddForeignKey
ALTER TABLE "public"."Fragment" ADD CONSTRAINT "Fragment_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
