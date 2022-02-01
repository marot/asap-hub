<<<<<<< HEAD
import algoliasearch, { SearchClient } from 'algoliasearch';
import { AlgoliaSearchClient } from './client';

export type { SearchResponse } from '@algolia/client-search';
export * from './client';
=======
import algoliasearch from 'algoliasearch';
import { AlgoliaSearchClient } from './client';
import * as config from './config';

<<<<<<< HEAD
export type { SearchResponse } from '@algolia/client-search';
<<<<<<< HEAD
export type { AlgoliaSearchClient, EntityRecord } from './client';
>>>>>>> refactor the client
=======
=======
export type { SearchResponse, BatchActionType } from '@algolia/client-search';
>>>>>>> Add batch support
export type {
  AlgoliaSearchClient,
  AlgoliaBatchRequest as BatchRequest,
  EntityRecord,
  EntityResponses,
} from './client';
>>>>>>> refactor part 2
export * from './scripts/move-index';
export * from './scripts/remove-index';
export * from './scripts/remove-records';

<<<<<<< HEAD
type AlgoliaSearchClientNativeFactoryParams = {
  algoliaApiKey: string;
  algoliaAppId: string;
};

export const algoliaSearchClientNativeFactory = ({
  algoliaApiKey,
  algoliaAppId,
}: AlgoliaSearchClientNativeFactoryParams): SearchClient =>
  algoliasearch(algoliaAppId, algoliaApiKey);

type AlgoliaSearchClientFactoryParams =
  AlgoliaSearchClientNativeFactoryParams & {
    algoliaIndex: string;
  };

export const algoliaSearchClientFactory = ({
  algoliaIndex,
  algoliaApiKey,
  algoliaAppId,
}: AlgoliaSearchClientFactoryParams): AlgoliaSearchClient => {
  const algoliaSearchClient = algoliasearch(algoliaAppId, algoliaApiKey);

  const index = algoliaSearchClient.initIndex(algoliaIndex);
=======
export const algoliaSearchClientNative = algoliasearch(
  config.algoliaAppId,
  config.algoliaApiKey,
);

export const algoliaSearchClientFactory = (
  algoliaIndex: string,
  algoliaApiKey?: string,
): AlgoliaSearchClient => {
  const algoliaSearchClient = algoliasearch(
    config.algoliaAppId,
    algoliaApiKey || config.algoliaApiKey,
  );

<<<<<<< HEAD
<<<<<<< HEAD
  const index = algoliaSearchClientNative.initIndex(algoliaIndex);
>>>>>>> refactor the client
=======
const index = algoliaSearchClient.initIndex(algoliaIndex);
>>>>>>> refactor part 2
=======
  const index = algoliaSearchClient.initIndex(algoliaIndex);
>>>>>>> update user index handler

  return new AlgoliaSearchClient(index);
};
