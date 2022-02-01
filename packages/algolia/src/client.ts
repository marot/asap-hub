import { SearchIndex } from 'algoliasearch';
import {
  SearchOptions,
  SearchResponse,
  BatchActionType,
  BatchRequest,
} from '@algolia/client-search';
import { ResearchOutputResponse, UserResponse } from '@asap-hub/model';

<<<<<<< HEAD
<<<<<<< HEAD
export const RESEARCH_OUTPUT_ENTITY_TYPE = 'research-output';
export const USER_ENTITY_TYPE = 'user';

export type EntityResponses = {
  [RESEARCH_OUTPUT_ENTITY_TYPE]: ResearchOutputResponse;
  [USER_ENTITY_TYPE]: UserResponse;
=======
type EntityResponses = {
=======
export type EntityResponses = {
>>>>>>> refactor part 2
  'research-output': ResearchOutputResponse;
  user: UserResponse;
>>>>>>> refactor the client
};

export type EntityRecord<T extends keyof EntityResponses> =
  EntityResponses[T] & {
    objectID: string;
    __meta: {
      type: T;
    };
  };

<<<<<<< HEAD
export type SearchEntityResponse<TEntityType extends keyof EntityResponses> =
  SearchResponse<EntityRecord<TEntityType>>;

export const getEntityType = (
  entity: EntityResponses[keyof EntityResponses],
): keyof EntityResponses => {
  if ('title' in entity && 'sharingStatus' in entity) {
=======
export const getEntityType = (
  entity: EntityResponses[keyof EntityResponses],
): keyof EntityResponses => {
  if ('title' in entity) {
>>>>>>> refactor the client
    return 'research-output';
  }

  return 'user';
};

export type AlgoliaBatchRequest = {
  action: BatchActionType;
  body: EntityResponses[keyof EntityResponses];
};

export class AlgoliaSearchClient {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  public constructor(private index: SearchIndex) {
    // do nothing
  }

  async save(payload: EntityResponses[keyof EntityResponses]): Promise<void> {
=======
=======
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>>>>>>> refactor part 2
  public constructor(private index: SearchIndex) {}
=======
  public constructor(private index: SearchIndex) {
    // do nothing
  }
>>>>>>> update user index handler

<<<<<<< HEAD
<<<<<<< HEAD
  save = async (
    payload: EntityResponses[keyof EntityResponses],
  ): Promise<void> => {
>>>>>>> refactor the client
=======
=======
  async batch(requests: AlgoliaBatchRequest[]): Promise<void> {
    await this.index.batch(
      requests.map(
        ({ action, body }): BatchRequest => ({
          action,
          body: {
            ...body,
            objectID: body.id,
            __meta: { type: getEntityType(body) },
          },
        }),
      ),
    );
  }

>>>>>>> Add batch support
  async save(payload: EntityResponses[keyof EntityResponses]): Promise<void> {
>>>>>>> refactor algolia client
    await this.index.saveObject({
      ...payload,
      objectID: payload.id,
      __meta: { type: getEntityType(payload) },
    });
  }

  async remove(objectID: string): Promise<void> {
    await this.index.deleteObject(objectID);
  }

  async searchEntity<T extends keyof EntityResponses>(
    entityType: T,
    query: string,
    requestOptions?: SearchOptions,
  ): Promise<SearchEntityResponse<T>> {
    const options: SearchOptions = {
      ...requestOptions,
      filters: requestOptions?.filters
        ? `${requestOptions.filters} AND __meta.type:"${entityType}"`
        : `__meta.type:"${entityType}"`,
    };

    return this.index.search<EntityRecord<T>>(query, options);
  }
}
