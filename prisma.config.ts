import "dotenv/config";
import { defineConfig } from "@prisma/config";

function fixConnectionString(url: string | undefined) {
  if (!url || !url.startsWith("postgre")) return url || "postgres://dummy:dummy@localhost:5432/dummy";
  try {
    const protocolSplit = url.indexOf("://");
    if (protocolSplit === -1) return url;
    const protocol = url.substring(0, protocolSplit + 3);
    const rest = url.substring(protocolSplit + 3);
    const lastAtIdx = rest.lastIndexOf("@");
    if (lastAtIdx === -1) return url;
    const credentials = rest.substring(0, lastAtIdx);
    const hostPart = rest.substring(lastAtIdx + 1);
    const colonIdx = credentials.indexOf(":");
    if (colonIdx === -1) return url;
    const user = credentials.substring(0, colonIdx);
    const password = credentials.substring(colonIdx + 1);
    let decodedPassword = password;
    try { decodedPassword = decodeURIComponent(password); } catch(e) {}
    const encodedPassword = encodeURIComponent(decodedPassword);
    return `${protocol}${user}:${encodedPassword}@${hostPart}`;
  } catch (e) {
    return url;
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: fixConnectionString(process.env.DATABASE_URL),
  },
});