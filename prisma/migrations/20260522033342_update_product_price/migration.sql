/*
  Warnings:

  - The values [WAITING_PAYMENT,PAID,PROCESSING,SHIPPED,COMPLETED,RETURN_REQUESTED,REFUNDED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [CUSTOMER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `campaignCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `grandTotal` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceNumber` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `marketingSource` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingCost` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productVariantId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductReview` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ProductReview` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the `CustomerServiceChat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReturnRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wishlist` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `ProductReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');
ALTER TABLE "public"."Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN', 'CUSTOMER_SERVICE');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER_SERVICE';
COMMIT;

-- DropForeignKey
ALTER TABLE "CustomerServiceChat" DROP CONSTRAINT "CustomerServiceChat_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ProductReview" DROP CONSTRAINT "ProductReview_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReturnRequest" DROP CONSTRAINT "ReturnRequest_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ReturnRequest" DROP CONSTRAINT "ReturnRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "Shipment" DROP CONSTRAINT "Shipment_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_productId_fkey";

-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_userId_fkey";

-- DropIndex
DROP INDEX "Order_invoiceNumber_key";

-- DropIndex
DROP INDEX "Order_status_idx";

-- DropIndex
DROP INDEX "Order_userId_idx";

-- DropIndex
DROP INDEX "OrderItem_productVariantId_idx";

-- DropIndex
DROP INDEX "ProductReview_userId_idx";

-- DropIndex
DROP INDEX "ProductVariant_sku_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "campaignCode",
DROP COLUMN "grandTotal",
DROP COLUMN "invoiceNumber",
DROP COLUMN "marketingSource",
DROP COLUMN "notes",
DROP COLUMN "shippingAddress",
DROP COLUMN "shippingCost",
DROP COLUMN "source",
DROP COLUMN "totalAmount",
DROP COLUMN "userId",
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "totalPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "productVariantId",
DROP COLUMN "subtotal",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductReview" DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "customerName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "price",
DROP COLUMN "sku",
DROP COLUMN "weight",
ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "stock" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER_SERVICE';

-- DropTable
DROP TABLE "CustomerServiceChat";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "ReturnRequest";

-- DropTable
DROP TABLE "Shipment";

-- DropTable
DROP TABLE "Wishlist";

-- DropEnum
DROP TYPE "OrderSource";

-- DropEnum
DROP TYPE "PaymentMethod";

-- DropEnum
DROP TYPE "PaymentStatus";

-- DropEnum
DROP TYPE "ReturnStatus";

-- DropEnum
DROP TYPE "ReturnType";

-- CreateTable
CREATE TABLE "VisitorLog" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitorLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInformation" (
    "id" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "instagram" TEXT,
    "tiktok" TEXT,
    "address" TEXT,
    "googleMapsUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VisitorLog_createdAt_idx" ON "VisitorLog"("createdAt");

-- CreateIndex
CREATE INDEX "VisitorLog_path_idx" ON "VisitorLog"("path");

-- CreateIndex
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

-- CreateIndex
CREATE INDEX "Product_slug_idx" ON "Product"("slug");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
