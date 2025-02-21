const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const seed = async() => {
    const numOfSeeds = 10;

    const employees = Array.from({length: numOfSeeds}, (_, i)=> ({

        name: `employee ${i + 1}`,
    }));

    await prisma.employee.createMany({
        data: employees
    });
}

seed().catch((e)=>{
    console.log(e)
}).finally(async()=> {
    await prisma.$disconnect();
});
