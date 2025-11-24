import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient()




// const prisma = new PrismaClient();

// const prismaExtended = prisma.$extends({
//   name: "autoOrderExtension",
//   model: {
//     column: {
//       async createWithOrder(data: { name: string; groupId: string }) {
//         console.log(data);
        
//         const maxOrder = await prisma.column.findFirst({
//           where: { groupId: data.groupId },
//           orderBy: { order: "desc" },
//           select: { order: true },
//         }).then(c => c?.order ?? 0);

//         return prisma.column.create({
//           data: { ...data, order: maxOrder + 1 },
//         });
//       },
//     },
//     task: {
//       async createWithOrder(data: { title: string; columnId: string }) {
//         const maxOrder = await prisma.task.findFirst({
//           where: { columnId: data.columnId },
//           orderBy: { order: "desc" },
//           select: { order: true },
//         }).then(t => t?.order ?? 0);

//         return prisma.task.create({
//           data: { ...data, order: maxOrder + 1 },
//         });
//       },
//     },
//   },
// });








// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma







// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()
// export default prisma
