/*
  Warnings:

  - You are about to drop the column `content` on the `Fragment` table. All the data in the column will be lost.
  - You are about to drop the column `sandboxId` on the `Fragment` table. All the data in the column will be lost.
  - Added the required column `sandboxUrl` to the `Fragment` table without a default value. This is not possible if the table is not empty.
  - Made the column `messageId` on table `Fragment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Fragment" DROP CONSTRAINT "Fragment_messageId_fkey";

-- AlterTable
ALTER TABLE "public"."Fragment" DROP COLUMN "content",
DROP COLUMN "sandboxId",
ADD COLUMN     "sandboxUrl" TEXT NOT NULL,
ALTER COLUMN "messageId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Fragment" ADD CONSTRAINT "Fragment_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
