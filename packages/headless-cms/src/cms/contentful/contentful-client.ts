import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import contentful, { ContentfulClientApi } from 'contentful';

import { contentfulConfig } from '../../config';

export class ContentfulClient {
  public readonly delivery: ContentfulClientApi;
  public readonly graphql: ApolloClient<unknown>;

  constructor() {
    this.delivery = contentful.createClient({
      space: contentfulConfig.spaceId,
      accessToken: contentfulConfig.deliveryApiKey,
      environment: contentfulConfig.environment,
    });

    this.graphql = this.getGraphQLClient();
  }

  private getGraphQLClient(): ApolloClient<unknown> {
    return new ApolloClient<unknown>({
      link: new HttpLink({
        uri: `https://graphql.contentful.com/content/v1/spaces/${contentfulConfig.spaceId}`,
        credentials: 'same-origin',
        headers: {
          Authorization: `Bearer ${contentfulConfig.deliveryApiKey}`,
        },
      }),
      cache: new InMemoryCache(),
    });
  }
}
