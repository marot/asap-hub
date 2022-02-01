import { createResearchOutputResponse } from '@asap-hub/fixtures';
<<<<<<< HEAD
import {
  EntityRecord,
  RESEARCH_OUTPUT_ENTITY_TYPE,
  EntityResponses,
  SearchEntityResponse,
} from '@asap-hub/algolia';

export const createAlgoliaResponse = <EntityType extends keyof EntityResponses>(
  type: EntityType,
  data: EntityResponses[EntityType][],
  overrides: Partial<SearchEntityResponse<EntityType>> = {},
): SearchEntityResponse<EntityType> => ({
=======
import { SearchResponse, EntityRecord } from '@asap-hub/algolia';

export const createAlgoliaResponse = (
  data: EntityRecord<'research-output'>[],
  overrides: Partial<SearchResponse<EntityRecord<'research-output'>>> = {},
): SearchResponse<EntityRecord<'research-output'>> => ({
>>>>>>> refactor the client
  nbHits: data.length,
  page: 0,
  nbPages: 1,
  hitsPerPage: 10,
  exhaustiveNbHits: true,
  query: '',
  params: 'page=0&hitsPerPage=10&validUntil=1629454922296',
  renderingContent: {},
  processingTimeMS: 1,
  ...overrides,
  hits: data.map((item, i) => ({
    ...item,
    objectID: `${i}`,
<<<<<<< HEAD
    __meta: { type },
=======
    __meta: { type: 'research-output' },
>>>>>>> refactor the client
  })),
});

export const createResearchOutputAlgoliaRecord = (
  itemIndex = 0,
<<<<<<< HEAD
): EntityRecord<typeof RESEARCH_OUTPUT_ENTITY_TYPE> => {
=======
): EntityRecord<'research-output'> => {
>>>>>>> refactor the client
  const response = createResearchOutputResponse(itemIndex);

  return {
    ...response,
    objectID: response.id,
    __meta: { type: 'research-output' },
  };
};

export const createResearchOutputListAlgoliaResponse = (
  items: number,
<<<<<<< HEAD
<<<<<<< HEAD
  responseOverride?: Partial<
    SearchEntityResponse<typeof RESEARCH_OUTPUT_ENTITY_TYPE>
  >,
): SearchEntityResponse<typeof RESEARCH_OUTPUT_ENTITY_TYPE> =>
  createAlgoliaResponse<typeof RESEARCH_OUTPUT_ENTITY_TYPE>(
    RESEARCH_OUTPUT_ENTITY_TYPE,
=======
  responseOverride?: SearchResponse<EntityRecord<'research-output'>>,
=======
  responseOverride?: Partial<SearchResponse<EntityRecord<'research-output'>>>,
>>>>>>> refactor part 2
): SearchResponse<EntityRecord<'research-output'>> =>
  createAlgoliaResponse(
>>>>>>> refactor the client
    Array.from({ length: items }, (_, itemIndex) =>
      createResearchOutputAlgoliaRecord(itemIndex),
    ),
    responseOverride,
  );
