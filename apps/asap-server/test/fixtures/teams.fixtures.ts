import { ListTeamResponse, TeamResponse, TeamTool } from '@asap-hub/model';
import { config, RestTeam, Team, WebhookPayload } from '@asap-hub/squidex';
import { RestUser } from '@asap-hub/squidex';
import { ResponseFetchTeam } from '../../src/controllers/teams';
import {
  FetchTeamQuery,
  FetchTeamsQuery,
  Labs,
  UsersDataQuestionsChildDto,
  UsersDataTeamsChildDto,
  UsersFlatDataDto,
} from '../../src/gql/graphql';
import { getGraphQLUser } from './users.fixtures';

export const referencingUsersContentsResponse = ({
  avatar,
}: {
  avatar?: null;
}) => [
  {
    id: 'user-id-1',
    created: '2020-09-25T09:42:51.132Z',
    lastModified: '2020-09-25T09:42:51.132Z',
    version: 42,
    flatData: {
      avatar,
      email: 'cristiano@ronaldo.com',
      firstName: 'Cristiano',
      lastName: 'Ronaldo',
      jobTitle: 'Junior',
      institution: 'Dollar General Corporation',
      connections: [],
      biography: '',
      degree: '',
      contactEmail: '',
      country: '',
      city: '',
      orcid: '',
      orcidWorks: [],
      responsibilities: '',
      researchInterests: '',
      reachOut: '',
      lastModifiedDate: '2020-11-26T11:56:04Z',
      orcidLastModifiedDate: '2020-11-26T11:56:04Z',
      orcidLastSyncDate: '2020-11-26T11:56:04Z',
      teams: [
        {
          id: [
            {
              id: 'team-id-1',
              created: '2020-09-23T20:33:36Z',
              lastModified: '2020-11-26T11:56:04Z',
              version: 42,
              flatData: {
                displayName: 'Schipa, A',
              },
            },
          ],
          role: 'Lead PI (Core Leadership)',
        },
      ] as Array<UsersDataTeamsChildDto>,
      questions: [] as Array<UsersDataQuestionsChildDto>,
      role: 'Grantee',
      onboarded: true,
      labs: [
        { id: 'cd7be4902', flatData: { name: 'Barcelona' } },
        { id: 'cd7be4905', flatData: { name: 'Glasgow' } },
      ] as Array<Labs>,
      adminNotes: null,
      social: [],
      expertiseAndResourceDescription: '',
      expertiseAndResourceTags: [],
    } as UsersFlatDataDto,
  },
];

export const getListTeamResponse = (): ListTeamResponse => ({
  total: 1,
  items: [getTeamResponse()],
});

export const getTeamResponse = (): TeamResponse => ({
  id: 'team-id-1',
  displayName: 'Team A',
  lastModifiedDate: '2020-11-26T11:56:04.000Z',
  labCount: 2,
  expertiseAndResourceTags: ['Animal resources'],
  members: [
    {
      id: 'user-id-1',
      email: 'H@rdy.io',
      firstName: 'Tom',
      lastName: 'Hardy',
      displayName: 'Tom Hardy',
      role: 'Lead PI (Core Leadership)',
      avatarUrl: undefined,
      labs: [
        { id: 'cd7be4902', name: 'Brighton' },
        { id: 'cd7be4903', name: 'Liverpool' },
      ],
    },
  ],
  projectTitle:
    'The genome-microbiome axis in the cause of Parkinson disease: Mechanistic insights and therapeutic implications from experimental models and a genetically stratified patient population.',
  proposalURL: '4cfb1b7b-bafe-4fca-b2ab-197e84d98996',
  tools: [],
});

export const graphQlTeamResponse: { data: ResponseFetchTeam } = {
  data: {
    findTeamsContent: {
      __typename: 'Teams',
      id: 'team-id-1',
      created: '2020-09-23T20:33:36Z',
      lastModified: '2020-11-26T11:56:04Z',
      version: 42,
      flatData: {
        applicationNumber: 'ASAP-000420',
        displayName: 'Schipa, A',
        projectSummary: null,
        projectTitle:
          'The genome-microbiome axis in the cause of Parkinson disease: Mechanistic insights and therapeutic implications from experimental models and a genetically stratified patient population.',
        expertiseAndResourceTags: ['Animal resources'],
        proposal: [
          {
            id: '4cfb1b7b-bafe-4fca-b2ab-197e84d98996',
          },
        ],
        tools: [],
      },
      referencingUsersContents: [
        {
          id: 'user-id-1',
          created: '2020-09-25T09:42:51.132Z',
          lastModified: '2020-09-25T09:42:51.132Z',
          version: 42,
          flatData: {
            avatar: [
              {
                id: 'uuid-user-id-1',
              },
            ],
            email: 'cristiano@ronaldo.com',
            firstName: 'Cristiano',
            lastName: 'Ronaldo',
            jobTitle: 'Junior',
            institution: 'Dollar General Corporation',
            connections: [],
            biography: '',
            teams: [
              {
                id: [
                  {
                    __typename: 'Teams',
                    id: 'team-id-1',
                    created: '2020-09-23T20:33:36Z',
                    lastModified: '2020-11-26T11:56:04Z',
                    version: 42,
                    flatData: {
                      displayName: 'Schipa, A',
                      tools: [],
                    },
                  },
                ],
                role: 'Lead PI (Core Leadership)',
              },
            ],
            questions: [],
            expertiseAndResourceTags: [],
            role: 'Grantee',
            onboarded: true,
            labs: [
              { id: 'cd7be4902', flatData: { name: 'Barcelona' } },
              { id: 'cd7be4905', flatData: { name: 'Glasgow' } },
            ],
          },
        },
      ],
    },
  },
};

export const fetchTeamByIdExpectation: TeamResponse = {
  id: 'team-id-1',
  displayName: 'Schipa, A',
  lastModifiedDate: '2020-11-26T11:56:04.000Z',
  expertiseAndResourceTags: ['Animal resources'],
  members: [
    {
      id: 'user-id-1',
      firstName: 'Cristiano',
      lastName: 'Ronaldo',
      avatarUrl: `${config.baseUrl}/api/assets/${config.appName}/uuid-user-id-1`,
      email: 'cristiano@ronaldo.com',
      displayName: 'Cristiano Ronaldo',
      role: 'Lead PI (Core Leadership)',
      labs: [
        { id: 'cd7be4902', name: 'Barcelona' },
        { id: 'cd7be4905', name: 'Glasgow' },
      ],
    },
  ],
  projectTitle:
    'The genome-microbiome axis in the cause of Parkinson disease: Mechanistic insights and therapeutic implications from experimental models and a genetically stratified patient population.',
  proposalURL: '4cfb1b7b-bafe-4fca-b2ab-197e84d98996',
  tools: [],
  labCount: 2,
};

export const getUpdateTeamResponse = (tools: TeamTool[] = []): RestTeam => ({
  id: 'team-id-1',
  data: {
    displayName: { iv: 'Cristiano Ronaldo' },
    applicationNumber: { iv: 'hofded' },
    projectTitle: {
      iv: 'Ce fe kok ob lovkad pim cukiviw lakwujuz vilid camiduci nim ca perkeb mekkaho wuculate re huppoljop.',
    },
    projectSummary: {
      iv: 'Wi dalev fu jusjuh buw nauzi kas ma. Fo ajelo pu vaenusug ezuhsi resdudif ebsofak tav dan mumooz awgabu meki gicub bowec afegeir tozab umefarow.',
    },
    expertiseAndResourceTags: { iv: [] },
    tools: { iv: tools },
  },
  created: '2020-09-08T16:35:28Z',
  lastModified: '2020-09-08T16:35:28Z',
  version: 42,
});

export type GraphTeamTool = NonNullable<
  NonNullable<FetchTeamQuery['findTeamsContent']>['flatData']['tools']
>[number];

export const getGraphqlTeam = (
  tools: GraphTeamTool[] = [],
  id: string = 'team-id-1',
): NonNullable<FetchTeamQuery['findTeamsContent']> => ({
  id,
  created: '2020-09-23T20:33:36Z',
  lastModified: '2020-11-26T11:56:04Z',
  version: 42,
  flatData: {
    applicationNumber: 'ASAP-000420',
    displayName: 'Team A',
    projectSummary: null,
    projectTitle:
      'The genome-microbiome axis in the cause of Parkinson disease: Mechanistic insights and therapeutic implications from experimental models and a genetically stratified patient population.',
    expertiseAndResourceTags: ['Animal resources'],
    proposal: [
      {
        id: '4cfb1b7b-bafe-4fca-b2ab-197e84d98996',
      },
    ],
    tools,
  },
  referencingUsersContents: [getGraphQLUser(undefined, id)],
});

export const getGraphQlTeamResponse = (
  tools: GraphTeamTool[] = [],
): { data: FetchTeamQuery } => ({
  data: {
    findTeamsContent: getGraphqlTeam(tools),
  },
});

export const getGraphQlTeamsResponse = (): { data: FetchTeamsQuery } => ({
  data: {
    queryTeamsContentsWithTotal: {
      total: 1,
      items: [getGraphqlTeam()],
    },
  },
});

export const updateResponseTeam: { total: number; items: RestUser[] } = {
  total: 1,
  items: [
    {
      id: 'user-id-1',
      data: {
        role: { iv: 'Grantee' },
        lastModifiedDate: { iv: '2020-09-25T09:42:51.132Z' },
        email: { iv: 'cristiano@ronaldo.com' },
        firstName: { iv: 'Cristiano' },
        lastName: { iv: 'Ronaldo' },
        jobTitle: { iv: 'Junior' },
        orcid: { iv: '363-98-9330' },
        institution: { iv: 'Dollar General Corporation' },
        avatar: { iv: ['uuid-user-id-1'] },
        expertiseAndResourceTags: { iv: [] },
        orcidWorks: { iv: [] },
        teams: {
          iv: [
            {
              role: 'Lead PI (Core Leadership)',
              id: ['team-id-1'],
            },
          ],
        },
        connections: { iv: [] },
        questions: { iv: [] },
        onboarded: {
          iv: true,
        },
        labs: {
          iv: [
            { id: 'cd7be4902', flatData: { name: 'Barcelona' } },
            { id: 'cd7be4905', flatData: { name: 'Glasgow' } },
          ],
        },
      },
      created: '2020-09-25T09:42:51Z',
      lastModified: '2020-09-25T09:42:51Z',
      version: 42,
    },
  ],
};

export const updateExpectation: TeamResponse = fetchTeamByIdExpectation;

const getTeamsEvent = (
  eventType: string,
  eventName: string,
  data = {
    displayName: { iv: 'Team 1' },
    applicationNumber: { iv: '12345' },
    expertiseAndResourceTags: { iv: [] },
    proposal: { iv: [] },
    projectTitle: { iv: 'Team Project' },
    projectSummary: { iv: '' },
    tools: { iv: [] },
  },
  dataOld = {
    displayName: { iv: 'Team 1' },
    applicationNumber: { iv: '12345' },
    expertiseAndResourceTags: { iv: [] },
    proposal: { iv: [] },
    projectTitle: { iv: 'Team Project' },
    projectSummary: { iv: '' },
    tools: { iv: [] },
  },
): WebhookPayload<Team> => ({
  type: eventName,
  timestamp: '2021-10-05T12:49:49Z',
  payload: {
    $type: 'EnrichedContentEvent',
    type: eventType,
    id: 'teamId',
    created: '2021-10-04T16:55:30Z',
    lastModified: '2021-10-05T12:49:49Z',
    version: 42,
    data,
    dataOld,
  },
});

export const getTeamsCreated = getTeamsEvent('Published', 'TeamsPublished');
export const getTeamsUpdated = getTeamsEvent('Updated', 'TeamsUpdated');
export const getTeamsDeleted = getTeamsEvent('Deleted', 'TeamsDeleted');

export const teamResponse: TeamResponse = updateExpectation;
