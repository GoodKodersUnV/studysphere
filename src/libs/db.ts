// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient;
// }

// export const db = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// export default prisma;


import { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({ log: ["info"] });
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const db = prisma

export default prisma;