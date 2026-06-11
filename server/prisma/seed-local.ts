process.env.DATABASE_URL =
    process.env.DATABASE_URL ?? "postgresql://postgres:1234@localhost:5433/postgres";

await import("./seed.ts");
