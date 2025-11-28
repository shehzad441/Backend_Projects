import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    db: {
      // MUST use this new format:
      url: "file:dev.db",
      directUrl: "file:dev.db",
    },
  },
});
