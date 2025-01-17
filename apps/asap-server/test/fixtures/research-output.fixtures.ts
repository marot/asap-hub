import {
  ListResearchOutputResponse,
  ListUserResponse,
  ResearchOutputResponse,
  ResearchOutputPostRequest,
} from '@asap-hub/model';
import { ResearchOutput, WebhookPayload } from '@asap-hub/squidex';
import { Rest } from '@asap-hub/squidex/src/entities/common';
import {
  FetchResearchOutputQuery,
  FetchResearchOutputsQuery,
} from '../../src/autogenerated-gql/graphql';
import {
  ResearchOutputEventType,
  SquidexResearchOutputsEventType,
} from '../../src/handlers/webhooks/webhook-research-output';
import { DeepWriteable } from '../../src/utils/types';
import { createEventBridgeEventMock } from '../../test/helpers/events';
import { getSquidexGraphqlTeam } from './teams.fixtures';
import {
  fetchExpectation,
  getGraphqlResponseFetchUsers,
} from './users.fixtures';

export const getSquidexResearchOutputsGraphqlResponse =
  (): FetchResearchOutputsQuery => ({
    queryResearchOutputsContentsWithTotal: {
      total: 1,
      items: [getSquidexGraphqlResearchOutput()],
    },
  });

export const getSquidexResearchOutputGraphqlResponseAuthors = (): NonNullable<
  NonNullable<
    FetchResearchOutputQuery['findResearchOutputsContent']
  >['flatData']['authors']
> =>
  getGraphqlResponseFetchUsers().queryUsersContentsWithTotal!.items!.map(
    (item) => ({
      __typename: 'Users',
      ...item,
    }),
  ) as NonNullable<
    NonNullable<
      FetchResearchOutputQuery['findResearchOutputsContent']
    >['flatData']['authors']
  >;

export const getSquidexResearchOutputGraphqlResponse =
  (): FetchResearchOutputQuery => ({
    findResearchOutputsContent: getSquidexGraphqlResearchOutput(),
  });

export const getSquidexGraphqlResearchOutput = (): NonNullable<
  FetchResearchOutputQuery['findResearchOutputsContent']
> => ({
  id: 'ec3086d4-aa64-4f30-a0f7-5c5b95ffbcca',
  created: '2020-09-23T16:34:26.842Z',
  lastModified: '2021-05-14T14:48:46Z',
  version: 42,
  flatData: {
    title: 'Test Proposal 1234',
    type: 'Grant Document',
    description: 'Text',
    link: null,
    addedDate: '2021-05-21T13:18:31Z',
    publishDate: '2021-05-21T13:18:31Z',
    labCatalogNumber: 'http://example.com',
    doi: '10.5555/YFRU1371',
    accession: 'U12345',
    rrid: 'RRID:AB_90755',
    tags: ['tag', 'test'],
    lastUpdatedPartial: '2020-09-23T16:34:26.842Z',
    authors: getSquidexResearchOutputGraphqlResponseAuthors(),
    accessInstructions: 'some access instructions',
    sharingStatus: 'Network Only',
    asapFunded: 'Yes',
    usedInAPublication: 'No',
    subtype: '3D Printing',
    labs: [
      {
        id: '99c78dd7-627e-4fbd-aaec-d1977895189e',
        flatData: {
          name: 'Test',
        },
      },
      {
        id: 'cd7be402-84d7-4d21-a360-82e2695f2dd9',
        flatData: {
          name: 'mike',
        },
      },
    ],
  },
  referencingTeamsContents: [getSquidexGraphqlTeam({})],
});

export const getResearchOutputResponse =
  (): DeepWriteable<ResearchOutputResponse> => ({
    id: 'ec3086d4-aa64-4f30-a0f7-5c5b95ffbcca',
    created: '2020-09-23T16:34:26.842Z',
    type: 'Grant Document',
    subTypes: ['3D Printing'],
    addedDate: '2021-05-21T13:18:31Z',
    title: 'Test Proposal 1234',
    description: 'Text',
    tags: ['tag', 'test'],
    authors: (fetchExpectation as DeepWriteable<ListUserResponse>).items,
    teams: [{ id: 'team-id-1', displayName: 'Team A' }],
    publishDate: '2021-05-21T13:18:31Z',
    labCatalogNumber: 'http://example.com',
    doi: '10.5555/YFRU1371',
    accession: 'U12345',
    rrid: 'RRID:AB_90755',
    lastUpdatedPartial: '2020-09-23T16:34:26.842Z',
    accessInstructions: 'some access instructions',
    sharingStatus: 'Network Only',
    asapFunded: true,
    usedInPublication: false,
    contactEmails: [],
    labs: [
      { id: '99c78dd7-627e-4fbd-aaec-d1977895189e', name: 'Test' },
      { id: 'cd7be402-84d7-4d21-a360-82e2695f2dd9', name: 'mike' },
    ],
  });

export const getListResearchOutputResponse =
  (): DeepWriteable<ListResearchOutputResponse> => ({
    total: 1,
    items: [getResearchOutputResponse()],
  });

export const getResearchOutputWebhookPayload = (
  id: string,
  type: SquidexResearchOutputsEventType,
): WebhookPayload<ResearchOutput> => ({
  type,
  timestamp: '2021-02-15T13:11:25Z',
  payload: {
    $type: 'EnrichedContentEvent',
    type: '',
    id,
    created: '2020-07-31T14:11:58Z',
    lastModified: '2020-07-31T15:49:41Z',
    version: 42,
    data: {
      type: { iv: 'Article' },
      title: { iv: 'Research Output' },
      description: { iv: 'Description' },
      sharingStatus: { iv: 'Network Only' },
      asapFunded: { iv: 'Not Sure' },
      usedInAPublication: { iv: 'Not Sure' },
    } as Rest<ResearchOutput>['data'],
    dataOld: {
      type: { iv: 'Article' },
      title: { iv: 'Research Output' },
      description: { iv: 'Description' },
      sharingStatus: { iv: 'Network Only' },
      asapFunded: { iv: 'Not Sure' },
      usedInAPublication: { iv: 'Not Sure' },
    } as Rest<ResearchOutput>['data'],
  },
});

export const getResearchOutputEvent = (
  id: string,
  squidexEvent:
    | 'ResearchOutputsPublished'
    | 'ResearchOutputsUpdated'
    | 'ResearchOutputsUnpublished'
    | 'ResearchOutputsDeleted',
  eventType: ResearchOutputEventType,
) =>
  createEventBridgeEventMock(
    getResearchOutputWebhookPayload(id, squidexEvent),
    eventType,
    id,
  );

export const getResearchOutputRequest = (): ResearchOutputPostRequest => ({
  type: 'Bioinformatics',
  link: 'https://hub.asap.science/',
  title: 'Output created through the ROMS form',
  asapFunded: undefined,
  sharingStatus: 'Network Only',
  usedInPublication: undefined,
  addedDate: new Date().toISOString(),
  teams: ['team-id-1'],
  description: 'An example description',
  tags: ['tag1'],
  subTypes: ['3D Printing'],
  labs: ['lab1'],
});
