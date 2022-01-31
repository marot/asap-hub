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
    return this.headlessResarchOutputs.fetch(options);
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
