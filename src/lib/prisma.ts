import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
    var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
    // During Next.js static build, process.env.DATABASE_URL might be undefined.
    // We provide a dummy URL to prevent PrismaClient initialization error.
    const connectionString = process.env.DATABASE_URL || "postgres://dummy:dummy@localhost:5432/dummy";
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
};

export const prisma =
    global.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

export default prisma;