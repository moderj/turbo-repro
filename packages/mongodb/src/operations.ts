import type {
  AggregateOptions,
  AnyBulkWriteOperation,
  BulkWriteOptions,
  CreateIndexesOptions,
  DistinctOptions,
  Document,
  Filter,
  FindOneAndUpdateOptions,
  FindOptions,
  IndexSpecification,
  OptionalUnlessRequiredId,
  UpdateFilter,
  UpdateOptions,
  WithId,
} from 'mongodb';

import { getDb } from './client.js';
import { addTimestampsOnInsert, addTimestampsOnUpdate } from './helpers.js';

const getCollection = <T extends Document = Document>(collectionName: string) =>
  getDb().collection<T>(collectionName);

export const createCollectionOperations = <T extends Document = Document>(
  collectionName: string,
) => {
  const insertMany = async (documents: Array<OptionalUnlessRequiredId<T>>) => {
    const documentsWithTimestamps = documents.map(addTimestampsOnInsert);
    const results = await getCollection<T>(collectionName).insertMany(documentsWithTimestamps, {
      ordered: false,
    });

    if (!results.acknowledged) throw new Error('Documents Insertion to db failed');

    return results.insertedIds;
  };

  const insertOne = async (document: OptionalUnlessRequiredId<T>) => {
    const documentWithTimestamps = addTimestampsOnInsert(document);
    const result = await getCollection<T>(collectionName).insertOne(documentWithTimestamps);

    if (!result.acknowledged) throw new Error('Document Insertion to db failed');

    return result.insertedId;
  };

  const updateOne = async (
    query: Filter<T>,
    update: UpdateFilter<T> | Document[],
    options?: UpdateOptions,
  ) => {
    const updateWithTimestamps = !Array.isArray(update) ? addTimestampsOnUpdate(update) : update;

    const result = await getCollection<T>(collectionName).updateOne(
      query,
      updateWithTimestamps,
      options,
    );

    return result;
  };

  const findOneAndUpdate = async <P extends T>(
    query: Filter<P>,
    update: UpdateFilter<T>,
    options: FindOneAndUpdateOptions = {},
  ) => {
    const updateWithTimestamps = addTimestampsOnUpdate(update);

    const result = await getCollection<P>(collectionName).findOneAndUpdate(
      query,
      updateWithTimestamps,
      options,
    );

    return result;
  };

  const updateMany = async (
    query: Filter<T>,
    update: UpdateFilter<T> | Document[],
    options?: UpdateOptions,
  ) => {
    const updateWithTimestamps = !Array.isArray(update) ? addTimestampsOnUpdate(update) : update;

    const result = await getCollection<T>(collectionName).updateMany(
      query,
      updateWithTimestamps,
      options,
    );

    return result;
  };

  const findOne = async <P extends Document = WithId<T>>(
    query: Filter<T>,
    options?: FindOptions<T>,
  ) => {
    const document = await getCollection<T>(collectionName).findOne<P>(query, options);

    return document;
  };

  const findByQuery = async <P extends Document = WithId<T>>(
    query: Filter<T>,
    options?: FindOptions<T>,
  ) => {
    const results = await getCollection<T>(collectionName).find<P>(query, options).toArray();

    return results;
  };

  const countByQuery = async (query: Filter<T>, options?: FindOptions<T>) => {
    const results = await getCollection<T>(collectionName).countDocuments(query, options);
    return results;
  };

  const aggregate = async <P extends Document = T>(
    pipeline?: Document[],
    options?: AggregateOptions,
  ) => {
    const results = await getCollection<T>(collectionName)
      .aggregate<P>(pipeline, options)
      .toArray();

    return results;
  };

  const distinct = async <Key extends keyof WithId<T>>(
    key: Key,
    filter: Filter<T> = {},
    options: DistinctOptions = {},
  ) => {
    const result = await getCollection<T>(collectionName).distinct(key, filter, options);

    return result;
  };

  const bulkWrite = async (
    operations: ReadonlyArray<AnyBulkWriteOperation<T>>,
    options?: BulkWriteOptions,
  ) => {
    const operationsWithTimestamps = operations.map((operation) => {
      if ('insertOne' in operation)
        operation.insertOne.document = addTimestampsOnInsert(operation.insertOne.document);
      if ('updateOne' in operation)
        operation.updateOne.update = !Array.isArray(operation.updateOne.update)
          ? addTimestampsOnUpdate(operation.updateOne.update)
          : operation.updateOne.update;
      if ('updateMany' in operation)
        operation.updateMany.update = !Array.isArray(operation.updateMany.update)
          ? addTimestampsOnUpdate(operation.updateMany.update)
          : operation.updateMany.update;

      return operation;
    });

    const result = await getCollection<T>(collectionName).bulkWrite(
      operationsWithTimestamps,
      options,
    );

    return result;
  };

  const bulkOp = () => getCollection<T>(collectionName).initializeUnorderedBulkOp();

  const createIndex = async (
    fieldOrSpec: IndexSpecification,
    options: CreateIndexesOptions = {},
  ) => {
    const result = await getCollection<T>(collectionName).createIndex(fieldOrSpec, options);

    return result;
  };

  const countDocuments = async (query: Filter<T>, options?: FindOptions<T>) => {
    const count = await getCollection<T>(collectionName).countDocuments(query, options);

    return count;
  };

  return {
    aggregate,
    countDocuments,
    insertMany,
    insertOne,
    updateOne,
    updateMany,
    findOne,
    findByQuery,
    countByQuery,
    findOneAndUpdate,
    distinct,
    bulkWrite,
    bulkOp,
    createIndex,
  };
};
