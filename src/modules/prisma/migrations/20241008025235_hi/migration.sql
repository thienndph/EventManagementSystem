-- CreateTable
CREATE TABLE "EventUser" (
    "idEvent" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "EventUser_pkey" PRIMARY KEY ("idEvent","idUser")
);

-- AddForeignKey
ALTER TABLE "EventUser" ADD CONSTRAINT "EventUser_idEvent_fkey" FOREIGN KEY ("idEvent") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUser" ADD CONSTRAINT "EventUser_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
