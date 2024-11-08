-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "oAuthToken" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Device" (
    "deviceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "deviceName" TEXT NOT NULL,
    "power" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "energy" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "location" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "Device_pkey" PRIMARY KEY ("deviceId")
);

-- CreateTable
CREATE TABLE "Power" (
    "dummyId" INTEGER NOT NULL,
    "north" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "south" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "east" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "west" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "Power_pkey" PRIMARY KEY ("dummyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_oAuthToken_key" ON "User"("oAuthToken");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
