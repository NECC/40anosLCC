import { afterAll, beforeAll, expect, test } from 'vitest';
import { setup, teardown } from '../prisma/seed';
import prisma from "../lib/prisma";

beforeAll(async () => await setup());

test('Fetch Carlos', async () => {
  const carlos = await prisma.speaker.findFirst({
    select: {
      name: true,
      bio: true,
    },
    where: {
      name: 'Carlos Fernandes',
    }
  });

  await expect(carlos).toStrictEqual({
    name: "Carlos Fernandes",
    bio: 'Insert bio here',
  });
});

afterAll(async () => await teardown());
