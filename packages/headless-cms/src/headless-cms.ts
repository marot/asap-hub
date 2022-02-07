import { HeadlessCmsCollection } from './headless-cms-collection';

import { ContentfulClient } from './cms/contentful/contentful-client';
import { ResearchOutputsCollection } from './cms/contentful/collections/research-outputs-collection';
import { ResearchOutputResponse } from '@asap-hub/model';

export type CollectionId = 'research-outputs' | 'users';
export type CollectionIdToHeadlessCmsCollection<T extends CollectionId> =
  T extends 'research-outputs'
    ? HeadlessCmsCollection<ResearchOutputResponse>
    : null;

export class HeadlessCms {
  private contentfulClient: ContentfulClient;

  constructor(contentfulClient: ContentfulClient) {
    this.contentfulClient = contentfulClient;
  }

  getCollection<T extends CollectionId>(
    collectionId: T,
  ): CollectionIdToHeadlessCmsCollection<T>;

  getCollection<T extends CollectionId>(
    collectionId: T,
  ): ResearchOutputsCollection | null {
    switch (collectionId) {
      case 'research-outputs':
        return new ResearchOutputsCollection(this.contentfulClient);
    }

    throw new Error('Unknown collection');
  }
}
