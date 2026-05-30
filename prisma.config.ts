// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",

  },

  datasource: {
    /*mode development*/
    //url: env("DATABASE_URL"),
    /*mode production */
    url: env("DIRECT_URL")
  },
});