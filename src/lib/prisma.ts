import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    // In Prisma 7, without an adapter, you must supply an accelerateUrl.
    // Providing a fallback prevents PrismaClientInitializationError during Next.js static build.
    accelerateUrl: process.env.DATABASE_URL || "postgres://dummy:dummy@localhost:5432/dummy"
  });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;