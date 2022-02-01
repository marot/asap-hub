<<<<<<< HEAD
import {
  RESEARCH_OUTPUT_ENTITY_TYPE,
  SearchEntityResponse,
} from '@asap-hub/algolia';
=======
import { EntityRecord, SearchResponse } from '@asap-hub/algolia';
>>>>>>> refactor part 2
import { ResearchOutputResponse } from '@asap-hub/model';
import { createResearchOutputResponse } from '@asap-hub/fixtures';

import { createResearchOutputListAlgoliaResponse } from '../../__fixtures__/algolia';

export const getResearchOutput = jest.fn(
  async (id: string): Promise<ResearchOutputResponse> => ({
    ...createResearchOutputResponse(),
    id,
  }),
);

export const getResearchOutputs = jest.fn(
<<<<<<< HEAD
  async (): Promise<
    Partial<SearchEntityResponse<typeof RESEARCH_OUTPUT_ENTITY_TYPE>>
  > => createResearchOutputListAlgoliaResponse(2),
=======
  async (): Promise<Partial<SearchResponse<EntityRecord<'research-output'>>>> =>
    createResearchOutputListAlgoliaResponse(2),
>>>>>>> refactor part 2
);
