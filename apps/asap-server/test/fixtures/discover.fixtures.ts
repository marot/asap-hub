import { DiscoverResponse } from '@asap-hub/model';
import { config } from '@asap-hub/squidex';
import { FetchDiscoverQuery } from '../../src/gql/graphql';

const squidexGraphqlDiscoverFlatData = () => ({
  training: [
    {
      id: 'uuid-training-1',
      created: '2020-09-24T11:06:27.164Z',
      lastModified: '2020-10-15T17:55:21Z',
      version: 42,
      flatData: {
        title: 'Title',
        text: 'Content',
        link: 'https://hub.asap.science',
        linkText: 'ASAP Training',
        type: 'Training',
        shortText: 'Short text',
        thumbnail: [
          {
            id: 'thumbnail-uuid1',
            thumbnailUrl: `${config.baseUrl}/api/assets/${config.appName}/thumbnail-uuid1`,
          },
        ],
      },
    },
  ],
  pages: [
    {
      id: 'uuid-pages-1',
      created: '2020-09-24T11:06:27.164Z',
      lastModified: '2020-10-15T17:55:21Z',
      version: 42,
      flatData: {
        title: 'Title',
        text: 'Content',
        link: 'https://hub.asap.science',
        linkText: 'ASAP Hub',
        shortText: 'Short text',
      },
    },
    {
      id: 'uuid-pages-2',
      created: '2020-09-24T11:06:27.164Z',
      lastModified: '2020-10-15T17:55:21Z',
      version: 42,
      flatData: {
        title: 'Title',
        text: 'Content',
        link: 'https://hub.asap.science',
        linkText: 'ASAP Hub',
        shortText: 'Short text',
      },
    },
  ],
  members: [
    {
      id: 'uuid-members-1',
      created: '2020-10-15T17:55:21Z',
      lastModified: '2020-10-15T17:55:21Z',
      version: 42,
      flatData: {
        avatar: [
          {
            id: 'uuid-1',
          },
        ],
        email: 'john@example.com',
        firstName: 'John',
        lastModifiedDate: '2020-10-15T17:55:21Z',
        lastName: 'Doe',
        institution: 'ASAP',
        jobTitle: 'Job title',
      },
    },
    {
      id: 'uuid-members-2',
      created: '2020-10-14T17:55:21Z',
      lastModified: '2020-10-15T17:55:21Z',
      version: 42,
      flatData: {
        email: null,
        lastModifiedDate: '2020-10-15T17:55:21Z',
        lastName: 'Do',
        firstName: 'John',
        institution: 'ASAP',
        jobTitle: 'Job title',
        avatar: [
          {
            id: 'uuid-2',
          },
        ],
      },
    },
  ],
  aboutUs: '<p>content<p>',
});

export const getSquidexGraphqlDiscover = () => ({
  id: 'ec3086d4-aa64-4f30-a0f7-5c5b95ffbcca',
  created: '2020-09-23T16:34:26.842Z',
  lastModified: '2021-05-14T14:48:46Z',
  version: 42,
  flatData: squidexGraphqlDiscoverFlatData(),
});

export const squidexGraphqlDiscoverResponse = (): DiscoverResponse => ({
  aboutUs: '<p>content<p>',
  training: [
    {
      id: 'uuid-training-1',
      created: '2020-09-24T11:06:27.164Z',
      title: 'Title',
      text: 'Content',
      link: 'https://hub.asap.science',
      linkText: 'ASAP Training',
      type: 'Training',
    },
  ],
  members: [
    {
      id: 'uuid-members-1',
      onboarded: true,
      createdDate: '2020-10-15T17:55:21.000Z',
      displayName: 'John Doe',
      orcid: undefined,
      firstName: 'John',
      lastName: 'Doe',
      biography: undefined,
      degree: undefined,
      email: 'john@example.com',
      contactEmail: undefined,
      country: undefined,
      city: undefined,
      orcidWorks: [],
      questions: [],
      expertiseAndResourceTags: [],
      expertiseAndResourceDescription: undefined,
      lastModifiedDate: '2020-10-15T17:55:21Z',
      teams: [],
      social: {},
      avatarUrl: `${config.baseUrl}/api/assets/${config.appName}/uuid-1`,
      role: 'Guest',
      responsibilities: undefined,
      reachOut: undefined,
      labs: [],
    },
    {
      id: 'uuid-members-2',
      onboarded: true,
      createdDate: '2020-10-14T17:55:21.000Z',
      orcid: undefined,
      displayName: 'John Do',
      firstName: 'John',
      lastName: 'Do',
      biography: undefined,
      degree: undefined,
      email: '',
      contactEmail: undefined,
      country: undefined,
      city: undefined,
      orcidWorks: [],
      questions: [],
      expertiseAndResourceTags: [],
      expertiseAndResourceDescription: undefined,
      lastModifiedDate: '2020-10-15T17:55:21Z',
      teams: [],
      social: {},
      role: 'Guest',
      responsibilities: undefined,
      reachOut: undefined,
      labs: [],
    },
  ],
  pages: [
    {
      id: 'uuid-pages-1',
      path: '',
      title: 'Title',
      text: 'Content',
      link: 'https://hub.asap.science',
      linkText: 'ASAP Hub',
      shortText: 'Short text',
    },
    {
      id: 'uuid-pages-2',
      path: '',
      title: 'Title',
      shortText: 'Short text',
      text: 'Content',
    },
  ],
});

export const squidexDiscoverResponse: NonNullable<FetchDiscoverQuery> = {
  queryDiscoverContents: [
    {
      flatData: squidexGraphqlDiscoverFlatData(),
    },
  ],
};
