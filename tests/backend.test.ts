import { afterAll, beforeAll, expect, test } from 'vitest';
import { setup, teardown } from '@/prisma/seed';
import prisma from "@/lib/prisma";

beforeAll(async () => await setup());
afterAll(async () => await teardown());

test('Fetch Carlos', async () => {
  let carlos = await prisma.speaker.findFirst({
    select: {
      name: true,
      bio: true,
    },
    where: {
      name: 'Carlos Fernandes',
    }
  });

  expect(carlos).toStrictEqual({
    name: "Carlos Fernandes",
    bio: 'Insert bio here',
  });
});
