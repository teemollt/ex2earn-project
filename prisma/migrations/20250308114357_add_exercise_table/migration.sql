-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_walletAddress_key" ON "Exercise"("walletAddress");
