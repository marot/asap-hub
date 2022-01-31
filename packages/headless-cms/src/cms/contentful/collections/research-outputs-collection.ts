import { ListResponse, ResearchOutputResponse } from '@asap-hub/model';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { ContentfulClient } from '../contentful-client';
import { HeadlessCmsCollection } from '../../../headless-cms-collection';

import {
  getSharedOutputById,
  GetSharedOutputByIdResponse,
  getSharedOutputsCollection,
  GetSharedOutputsCollectionResponse,
} from './graphql/research-outputs';

export type ContentfulResearchOutputEntity = ResearchOutputResponse & {
  squidexId: string;
};

export class ResearchOutputsCollection
  implements HeadlessCmsCollection<ResearchOutputResponse>
{
  constructor(private contentful: ContentfulClient) {
    // do nothing
  }

  async fetchById(id: string): Promise<ResearchOutputResponse | null> {
    const response =
      await this.contentful.graphql.query<GetSharedOutputByIdResponse>(
        getSharedOutputById(id),
      );

    if (!response || response.errors) {
      return null;
    }

    return this.mapResearchOutput(response.data);
  }

  async fetch(options: unknown): Promise<ListResponse<ResearchOutputResponse>> {
    const response =
      await this.contentful.graphql.query<GetSharedOutputsCollectionResponse>(
        getSharedOutputsCollection(),
      );

    return {
      total: response.data.sharedOutputsCollection.total,
      items: response.data.sharedOutputsCollection.items.map(
        this.mapResearchOutput,
      ),
    };
  }

  private mapResearchOutput(
    data: GetSharedOutputByIdResponse,
  ): ResearchOutputResponse {
    return {
      id: data.sys.id,
      type: 'Article',
      subTypes: ['3D Printing'],
      title: data.title || '',
      description:
        (data.description && documentToHtmlString(data.description)) || '',
      tags: [],
      created: '',
      addedDate: '',
      lastUpdatedPartial: '',
      authors: data.authorsCollection.items.map((author) => ({
        id: author.sys.id,
        onboarded: true,
        displayName: `${author.firstName} ${author.lastName}`,
        contactEmail: author.email,
        lastModifiedDate: '',
        createdDate: '',
        teams: [],
        expertiseAndResourceTags: [],
        questions: [],
        role: 'Guest',
        labs: [],
      })),
      teams: [],
      labs: data.labsCollection.items.map((lab) => ({
        id: lab.sys.id,
        name: lab.name || '',
      })),
      sharingStatus: 'Public',
      contactEmails: [],
    };
  }
}
