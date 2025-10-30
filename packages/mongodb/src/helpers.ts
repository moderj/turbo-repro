import type { Document } from 'mongodb';

export const addTimestampsOnInsert = <T extends Document & { createdAt?: Date; updatedAt?: Date }>(
  document: T,
) => {
  const now = new Date();
  document.createdAt = now;
  document.updatedAt = now;

  return document;
};

export const addTimestampsOnUpdate = (update: Record<string, unknown>): Record<string, unknown> => {
  const now = new Date();

  return {
    ...update,
    $set: { ...(update?.$set ?? {}), updatedAt: now },
    $setOnInsert: { ...(update?.$setOnInsert ?? {}), createdAt: now },
  };
};
