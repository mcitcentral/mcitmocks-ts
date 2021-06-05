import { PrismaClient } from '@prisma/client'


//// Instantiate Prisma Client
const prisma = new PrismaClient()

async function main(){
    //just for testing purpose
    await prisma.user.deleteMany({})


    const user= await prisma.user.create({
        data:{
            id: '1',
            email: 'alice@gmail.com',
            timeZone: 'Chicago/USA',
            availability: {
                create: [
                {
                    id:'11',
                    startTime:'new Date(2021, 0O5, 0O5, 17, 00, 00, 00)',
                    isTaken: true
                },
                {
                    id:'12',
                    startTime:'new Date(2021, 0O6, 0O5, 16, 00, 00, 00)',
                    isTaken: true
                },

                ],
            },
  
        

        },
        include: {
            availability: true,
        },
    })
console.log('hello world');
console.log(user);
}

main()
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect()
  })