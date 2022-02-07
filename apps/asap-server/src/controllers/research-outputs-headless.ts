import Boom from '@hapi/boom';
import {
  ResearchOutputResponse,
  ListResearchOutputResponse,
} from '@asap-hub/model';

import { HeadlessCmsCollection } from '@asap-hub/headless-cms';

export default class ResearchOutputs implements ResearchOutputController {
  headlessResarchOutputs: HeadlessCmsCollection<ResearchOutputResponse>;

  constructor(
    headlessResarchOutputs: HeadlessCmsCollection<ResearchOutputResponse>,
  ) {
    this.headlessResarchOutputs = headlessResarchOutputs;
  }

  async fetchById(id: string): Promise<ResearchOutputResponse> {
    const researchOuput: ResearchOutputResponse | null =
      await this.headlessResarchOutputs.fetchById(id);

    if (!researchOuput) {
      throw Boom.notFound();
    }

    return researchOuput;
  }

  async fetch(options: {
    take: number;
    skip: number;
    search?: string;
    filter?: string[];
  }): Promise<ListResearchOutputResponse> {
    return this.headlessResarchOutputs.fetch({
      AND: [
        {
          OR: (options.search || '')
            .split(' ')
            .map((word: string) => ({ OR: [{ title_contains: word }] })), // add tag_contains
        },
        {
          OR: (options.filter || []).map((word: string) => ({
            OR: [{ title_contains: word }],
          })), // change to type_contains
        },
      ],
    });
  }
}

export interface ResearchOutputController {
  fetch: (options: {
    take: number;
    skip: number;
    search?: string;
    filter?: string[];
  }) => Promise<ListResearchOutputResponse>;

  fetchById: (id: string) => Promise<ResearchOutputResponse>;
}
