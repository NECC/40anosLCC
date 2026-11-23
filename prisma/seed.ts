import prisma from '@/lib/prisma';
import { setup, teardown } from './seed-data';

async function main() {
  await teardown();
  await setup();

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
