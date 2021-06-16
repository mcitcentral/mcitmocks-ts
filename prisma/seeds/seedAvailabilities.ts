import { PrismaClient } from "@prisma/client";
import AvailabilityRepository from "../../models/AvailabilityRepository";

//// Instantiate Prisma Client

/*export default async function main(){
    //just for testing purpose
    await prisma.availability.deleteMany({})


    const availability= await prisma.availability.create({
        data:[{
           
                    id:'11',
                    userId: '1',
                    startTime:new Date(2021,6,20,10,30,30,80),
                    isTaken: true
                },
                {
                    id:'12',
                    userId: '2',
                    startTime:new Date(2021,6,25,11,30,30,80),
                    isTaken: true
                },],

        /*include: {
            availability: true,
        },
    })*/

export default async function main(prisma: PrismaClient) {
  const availability1 = await prisma.availability.upsert({
    where: { id: "11" },
    create: {
      id: "11",
      user: { connect: { id: "2" } },
      startTime: new Date(2021, 6, 20, 10, 30, 30, 80),
      isTaken: true,
    },
    update: {
      user: { connect: { id: "2" } },
      startTime: new Date(2021, 6, 20, 10, 30, 30, 80),
      isTaken: true,
    },
  });
  console.log(availability1);
}
