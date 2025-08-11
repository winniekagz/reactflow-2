import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a test user (password: test123)
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {
      // Update with current values if user exists
      name: "Test User",
      password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.sm6e", // test123
    },
    create: {
      id: "test-user-id",
      email: "test@example.com",
      password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.sm6e", // test123
      name: "Test User",
    },
  });

  console.log("Seed data created:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
