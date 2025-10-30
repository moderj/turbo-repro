import type { z } from 'zod';

export const createMongodbSchema = (zod: typeof z) => {
  return zod.object({
    dbUrl: zod.string(),
    dbName: zod.string(),
  });
};
