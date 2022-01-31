import { ResearchOutputResponse } from '@asap-hub/model';
import { config, SquidexGraphqlError } from '@asap-hub/squidex';
import nock from 'nock';
import { FetchResearchOutputQuery } from '../../src/autogenerated-gql/graphql';
import ResearchOutputs from '../../src/controllers/research-outputs';
import {
  getListResearchOutputResponse,
  getResearchOutputRequest,
  getResearchOutputResponse,
  getSquidexResearchOutputGraphqlResponse,
  getSquidexResearchOutputsGraphqlResponse,
} from '../fixtures/research-output.fixtures';
import { getSquidexGraphqlTeam } from '../fixtures/teams.fixtures';
import {
  getGraphqlResponseFetchUsers,
  getGraphQLUser,
} from '../fixtures/users.fixtures';
import { identity } from '../helpers/squidex';
import { getSquidexGraphqlClientMockServer } from '../mocks/squidex-graphql-client-with-server.mock';
import { getSquidexGraphqlClientMock } from '../mocks/squidex-graphql-client.mock';

describe('ResearchOutputs controller', () => {
  const squidexGraphqlClientMock = getSquidexGraphqlClientMock();
  const researchOutputs = new ResearchOutputs(squidexGraphqlClientMock);

  const squidexGraphqlClientMockServer = getSquidexGraphqlClientMockServer();
  const researchOutputsMockGraphql = new ResearchOutputs(
    squidexGraphqlClientMockServer,
  );
  beforeAll(() => {
    identity();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Fetch by ID method', () => {
    const researchOutputId = 'some-uuid';

    test('Should fetch the research output from squidex graphql', async () => {
      const result = await researchOutputsMockGraphql.fetchById(
        researchOutputId,
      );

      expect(result).toMatchObject(getResearchOutputResponse());
    });

    test('Should throw a Not Found error when the research output is not found', async () => {
      squidexGraphqlClientMock.request.mockResolvedValueOnce({
        findResearchOutputsContent: null,
      });

      await expect(researchOutputs.fetchById(researchOutputId)).rejects.toThrow(
        'Not Found',
      );
    });

    test('Should throw an error with a specific error message when the graphql client throws one', async () => {
      squidexGraphqlClientMock.request.mockRejectedValueOnce(
        new SquidexGraphqlError(
          {
            status: 521,
            errors: [
              {
                message: 'some error message',
                path: ['asdasdas'],
                locations: [],
              },
            ],
          },
          { query: 'some query' },
        ),
      );

      await expect(researchOutputs.fetchById(researchOutputId)).rejects.toThrow(
        'some error message',
      );
    });

    test('Should default team displayName to an empty string when not present', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputGraphqlResponse();
      squidexGraphqlResponse.findResearchOutputsContent!.referencingTeamsContents![0]!.flatData.displayName =
        null;
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetchById(researchOutputId);

      result.teams
        .filter((team) => !team.displayName)
        .map(({ displayName }) => expect(displayName).toEqual(''));
    });

    test('Should default type to Grant Document and title to an empty string when missing', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputGraphqlResponse();
      squidexGraphqlResponse.findResearchOutputsContent!.flatData.type = null;
      squidexGraphqlResponse.findResearchOutputsContent!.flatData.title = null;
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetchById(researchOutputId);

      expect(result.title).toEqual('');
      expect(result.type).toEqual('Grant Document');
    });

    test('Should default sharingStatus to Network Only when missing', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputGraphqlResponse();
      squidexGraphqlResponse.findResearchOutputsContent!.flatData.sharingStatus =
        null;
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetchById(researchOutputId);

      expect(result.sharingStatus).toEqual('Network Only');
    });

    test('Should default asapFunded to undefined when missing', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputGraphqlResponse();
      squidexGraphqlResponse.findResearchOutputsContent!.flatData.asapFunded =
        null;
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetchById(researchOutputId);

      expect(result.asapFunded).not.toBeDefined();
    });

    test('Should default asapFunded "Not Sure" option to undefined', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputGraphqlResponse();
      squidexGraphqlResponse.findResearchOutputsContent!.flatData!.asapFunded =
        'Not Sure';
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetchById(researchOutputId);

      expect(result.asapFunded).not.toBeDefined();
    });

    test('Should default usedInPublication to undefined when missing', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputGraphqlResponse();
      squidexGraphqlResponse.findResearchOutputsContent!.flatData.usedInAPublication =
        null;
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetchById(researchOutputId);

      expect(result.usedInPublication).not.toBeDefined();
    });

    test('Should default usedInPublication "Not Sure" option to undefined', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputGraphqlResponse();
      squidexGraphqlResponse.findResearchOutputsContent!.flatData.usedInAPublication =
        'Not Sure';
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetchById(researchOutputId);

      expect(result.usedInPublication).not.toBeDefined();
    });

    test('Should default authors to an empty array when missing', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputGraphqlResponse();
      squidexGraphqlResponse.findResearchOutputsContent!.flatData.authors =
        null;
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetchById(researchOutputId);

      expect(result.authors).toEqual([]);
    });

    test('Should skip the lab when the name is empty', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputGraphqlResponse();
      squidexGraphqlResponse.findResearchOutputsContent!.flatData.labs = [
        {
          id: 'lab-id-1',
          flatData: {
            name: null,
          },
        },
        {
          id: 'lab-id-2',
          flatData: {
            name: 'lab name',
          },
        },
      ];
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetchById(researchOutputId);

      expect(result.labs).toEqual([
        {
          id: 'lab-id-2',
          name: 'lab name',
        },
      ]);
    });

    test('Should return the research output without the team', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputGraphqlResponse();
      squidexGraphqlResponse.findResearchOutputsContent!.referencingTeamsContents =
        [];
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetchById(researchOutputId);

      const expectedResult = getResearchOutputResponse();
      expectedResult.teams = [];
      expectedResult.contactEmails = []; // as there are no referencing teams, there won't be any PMs

      expect(result).toEqual(expectedResult);
    });

    test('Should return a mix of internal and external authors', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputGraphqlResponse();
      const squidexUser1 = {
        ...getGraphqlResponseFetchUsers().queryUsersContentsWithTotal!
          .items![0],
        __typename: 'Users',
      } as InternalUser;
      const squidexUser2 = {
        ...getGraphqlResponseFetchUsers().queryUsersContentsWithTotal!
          .items![1],
        __typename: 'Users',
      } as InternalUser;
      const externalAuthor: ExternalUser = {
        __typename: 'ExternalAuthors',
        id: '3099015c-c9ed-40fd-830a-8fe1b6ec0482',
        created: '2021-06-04T09:37:54Z',
        lastModified: '2021-06-04T09:37:54Z',
        version: 42,
        flatData: {
          name: 'test external author',
          orcid: '23423423',
        },
      };
      squidexGraphqlResponse.findResearchOutputsContent!.flatData.authors = [
        squidexUser1,
        externalAuthor,
        squidexUser2,
      ];
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetchById(researchOutputId);

      const { authors } = getResearchOutputResponse();

      const expectedAuthorsResponse: ResearchOutputResponse['authors'] = [
        authors[0]!,
        {
          displayName: externalAuthor.flatData!.name!,
          orcid: externalAuthor.flatData!.orcid!,
        },
        authors[1]!,
      ];

      expect(result.authors).toEqual(expectedAuthorsResponse);
    });

    test('Should not return the non-onboarded authors', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputGraphqlResponse();
      const squidexUser1 = {
        ...getGraphqlResponseFetchUsers().queryUsersContentsWithTotal!
          .items![0],
        __typename: 'Users',
        flatData: {
          ...getGraphqlResponseFetchUsers().queryUsersContentsWithTotal!
            .items![0]!.flatData,
          onboarded: false,
        },
      } as InternalUser;
      const squidexUser2 = {
        ...getGraphqlResponseFetchUsers().queryUsersContentsWithTotal!
          .items![1],
        __typename: 'Users',
        flatData: {
          ...getGraphqlResponseFetchUsers().queryUsersContentsWithTotal!
            .items![1]!.flatData,
          onboarded: true,
        },
      } as InternalUser;

      squidexGraphqlResponse.findResearchOutputsContent!.flatData.authors = [
        squidexUser1,
        squidexUser2,
      ];
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetchById(researchOutputId);

      const { authors } = getResearchOutputResponse();

      const expectedAuthorsResponse: ResearchOutputResponse['authors'] = [
        authors[1]!,
      ];

      expect(result.authors).toHaveLength(1);
      expect(result.authors).toEqual(expectedAuthorsResponse);
    });

    describe('PM emails', () => {
      test('Should return a list of PM emails', async () => {
        const squidexGraphqlResponse =
          getSquidexResearchOutputGraphqlResponse();

        // Two PMs on one team
        const pm1 = getGraphQLUser();
        pm1.flatData.email = 'pm1@example.com';
        pm1.flatData.teams![0]!.role = 'Project Manager';
        const pm2 = getGraphQLUser();
        pm2.flatData.email = 'pm2@example.com';
        pm2.flatData.teams![0]!.role = 'Project Manager';
        squidexGraphqlResponse.findResearchOutputsContent!.referencingTeamsContents![0]!.referencingUsersContents! =
          [pm1, pm2];

        // And one on another team
        const pm3 = getGraphQLUser();
        pm3.flatData.email = 'pm3@example.com';
        pm3.flatData.teams![0]!.role = 'Project Manager';
        const team = getSquidexGraphqlTeam({});
        team.referencingUsersContents = [pm3];
        squidexGraphqlResponse.findResearchOutputsContent!.referencingTeamsContents!.push(
          team,
        );

        squidexGraphqlClientMock.request.mockResolvedValueOnce(
          squidexGraphqlResponse,
        );

        const result = await researchOutputs.fetchById(researchOutputId);
        expect(result.contactEmails).toEqual([
          'pm1@example.com',
          'pm2@example.com',
          'pm3@example.com',
        ]);
      });

      test('PM emails should be deduplicated', async () => {
        const squidexGraphqlResponse =
          getSquidexResearchOutputGraphqlResponse();

        // Two PMs on one team
        const pm1 = getGraphQLUser();
        pm1.flatData.email = 'pm1@example.com';
        pm1.flatData.teams![0]!.role = 'Project Manager';
        const pm2 = getGraphQLUser();
        pm2.flatData.email = 'pm2@example.com';
        pm2.flatData.teams![0]!.role = 'Project Manager';
        squidexGraphqlResponse.findResearchOutputsContent!.referencingTeamsContents![0]!.referencingUsersContents! =
          [pm1, pm2];

        // Same one on another team
        const team = getSquidexGraphqlTeam({});
        team.referencingUsersContents = [pm1];
        squidexGraphqlResponse.findResearchOutputsContent!.referencingTeamsContents!.push(
          team,
        );

        squidexGraphqlClientMock.request.mockResolvedValueOnce(
          squidexGraphqlResponse,
        );

        const result = await researchOutputs.fetchById(researchOutputId);

        // Both these PMs are duplicated in the fixture
        expect(result.contactEmails).toEqual([
          'pm1@example.com',
          'pm2@example.com',
        ]);
      });
    });

    describe('Last Updated Partial field', () => {
      test('Should default to last-modified if the last-updated-partial is not present', async () => {
        const squidexGraphqlResponse =
          getSquidexResearchOutputGraphqlResponse();
        delete squidexGraphqlResponse.findResearchOutputsContent!.flatData
          .lastUpdatedPartial;
        squidexGraphqlClientMock.request.mockResolvedValueOnce(
          squidexGraphqlResponse,
        );

        const result = await researchOutputs.fetchById(researchOutputId);

        expect(result.lastUpdatedPartial).toEqual(
          squidexGraphqlResponse.findResearchOutputsContent!.lastModified,
        );
      });

      test('Should default to created-date if the last-updated-partial and last-modified are not present', async () => {
        const squidexGraphqlResponse =
          getSquidexResearchOutputGraphqlResponse();
        delete squidexGraphqlResponse.findResearchOutputsContent!.flatData
          .lastUpdatedPartial;
        delete (squidexGraphqlResponse.findResearchOutputsContent as any)
          .lastModified;
        squidexGraphqlClientMock.request.mockResolvedValueOnce(
          squidexGraphqlResponse,
        );

        const result = await researchOutputs.fetchById(researchOutputId);

        expect(result.lastUpdatedPartial).toEqual(
          squidexGraphqlResponse.findResearchOutputsContent!.created,
        );
      });
    });
  });

  describe('Fetch method', () => {
    test('Should fetch the research output from squidex graphql', async () => {
      const result = await researchOutputsMockGraphql.fetch({
        take: 8,
        skip: 0,
      });

      expect(result).toMatchObject(getListResearchOutputResponse());
    });

    test('Should return an empty result when the client returns an empty array of data', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputsGraphqlResponse();
      squidexGraphqlResponse.queryResearchOutputsContentsWithTotal!.total = 0;
      squidexGraphqlResponse.queryResearchOutputsContentsWithTotal!.items = [];
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetch({ take: 10, skip: 5 });

      expect(result).toEqual({ total: 0, items: [] });
    });

    test('Should return an empty result when the client returns a response with query property set to null', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputsGraphqlResponse();
      squidexGraphqlResponse.queryResearchOutputsContentsWithTotal = null;
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetch({ take: 10, skip: 5 });

      expect(result).toEqual({ total: 0, items: [] });
    });

    test('Should return an empty result when the client returns a response with items property set to null', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputsGraphqlResponse();
      squidexGraphqlResponse.queryResearchOutputsContentsWithTotal!.items =
        null;
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetch({ take: 10, skip: 5 });

      expect(result).toEqual({ total: 0, items: [] });
    });

    test('Should return Grant Document on ResearchOutputs', async () => {
      const squidexGraphqlResponse = getSquidexResearchOutputsGraphqlResponse();
      squidexGraphqlResponse.queryResearchOutputsContentsWithTotal!.items![0]!.flatData.type =
        'Grant Document';
      squidexGraphqlClientMock.request.mockResolvedValueOnce(
        squidexGraphqlResponse,
      );

      const result = await researchOutputs.fetch({ take: 10, skip: 0 });

      expect(result.items[0]!.type).toEqual('Grant Document');
    });

    describe('Parameters', () => {
      const defaultParams = {
        take: 8,
        skip: 0,
      };
      const expectedDefaultParams = {
        top: 8,
        skip: 0,
        filter: '',
        withTeams: true,
      };

      beforeEach(() => {
        squidexGraphqlClientMock.request.mockResolvedValueOnce(
          getSquidexResearchOutputsGraphqlResponse(),
        );
      });

      test('Should pass the pagination parameters as expected', async () => {
        await researchOutputs.fetch({ take: 13, skip: 7 });

        expect(squidexGraphqlClientMock.request).toHaveBeenCalledWith(
          expect.anything(),
          {
            ...expectedDefaultParams,
            top: 13,
            skip: 7,
          },
        );
      });

      test('Should pass the search parameter as a squidex filter', async () => {
        await researchOutputs.fetch({ ...defaultParams, search: 'Title' });

        expect(squidexGraphqlClientMock.request).toHaveBeenCalledWith(
          expect.anything(),
          {
            ...expectedDefaultParams,
            filter:
              "(contains(data/title/iv, 'Title') or contains(data/tags/iv, 'Title'))",
          },
        );
      });

      test('Should pass the filter parameter as a squidex filter', async () => {
        await researchOutputs.fetch({
          ...defaultParams,
          filter: ['Grant Document', 'Presentation'],
        });

        expect(squidexGraphqlClientMock.request).toHaveBeenCalledWith(
          expect.anything(),
          {
            ...expectedDefaultParams,
            filter:
              "(data/type/iv eq 'Grant Document' or data/type/iv eq 'Presentation')",
          },
        );
      });

      test('Should pass the search and filter parameter as a squidex filter', async () => {
        await researchOutputs.fetch({
          ...defaultParams,
          search: 'Title',
          filter: ['Grant Document', 'Presentation'],
        });

        const expectedFilter =
          "(data/type/iv eq 'Grant Document' or data/type/iv eq 'Presentation') " +
          "and (contains(data/title/iv, 'Title') or contains(data/tags/iv, 'Title'))";
        expect(squidexGraphqlClientMock.request).toHaveBeenCalledWith(
          expect.anything(),
          {
            ...expectedDefaultParams,
            filter: expectedFilter,
          },
        );
      });

      test('Should break up the search parameter into multiple words and send as a squidex filter', async () => {
        await researchOutputs.fetch({ ...defaultParams, search: 'some words' });

        const expectedFilter =
          "(contains(data/title/iv, 'some') or contains(data/tags/iv, 'some') or contains(data/title/iv, 'words') or contains(data/tags/iv, 'words'))";
        expect(squidexGraphqlClientMock.request).toHaveBeenCalledWith(
          expect.anything(),
          {
            ...expectedDefaultParams,
            filter: expectedFilter,
          },
        );
      });

      test('Should sanitise single quote in the search parameter by doubling it and encoding to hex for the squidex filter', async () => {
        await researchOutputs.fetch({ ...defaultParams, search: "'" });

        const expectedFilter =
          "(contains(data/title/iv, '%27%27') or contains(data/tags/iv, '%27%27'))";
        expect(squidexGraphqlClientMock.request).toHaveBeenCalledWith(
          expect.anything(),
          {
            ...expectedDefaultParams,
            filter: expectedFilter,
          },
        );
      });

      test('Should sanitise double quotation mark in the search parameter by doubling it and encoding to hex for the squidex filter', async () => {
        await researchOutputs.fetch({ ...defaultParams, search: '"' });

        const expectedFilter =
          "(contains(data/title/iv, '%22') or contains(data/tags/iv, '%22'))";
        expect(squidexGraphqlClientMock.request).toHaveBeenCalledWith(
          expect.anything(),
          {
            ...expectedDefaultParams,
            filter: expectedFilter,
          },
        );
      });
    });
  });

  describe('create', () => {
    afterEach(() => {
      expect(nock.isDone()).toBe(true);
    });

    afterEach(() => {
      nock.cleanAll();
    });
    test('creating the research output should return the id from squidex rest', async () => {
      const researchOutputRequest = getResearchOutputRequest();
      const teamId = researchOutputRequest.teamId;
      const researchOutputId = 'created-output-id';
      const {
        usedInPublication: _,
        teamId: __,
        ...squidexResearchOutput
      } = parseToSquidex(researchOutputRequest);

      nock(config.baseUrl)
        .post(`/api/content/${config.appName}/research-outputs?publish=false`, {
          ...squidexResearchOutput,
          asapFunded: { iv: 'Not Sure' },
          usedInAPublication: { iv: 'Not Sure' },
        })
        .reply(201, { id: researchOutputId })
        .get(`/api/content/${config.appName}/teams/${teamId}`)
        .matchHeader('X-Unpublished', `true`)
        .reply(200, { data: { id: teamId, outputs: { iv: ['output-1'] } } })
        .patch(`/api/content/${config.appName}/teams/${teamId}`, {
          outputs: { iv: ['output-1', researchOutputId] },
        })
        .reply(200);

      const id = await researchOutputs.create(researchOutputRequest);
      expect(id).toEqual({ id: researchOutputId });
    });
    test('should throw when fails to create the research output - 400', async () => {
      const researchOutputRequest = getResearchOutputRequest();

      nock(config.baseUrl)
        .post(`/api/content/${config.appName}/research-outputs?publish=false`)
        .reply(400);

      await expect(
        researchOutputs.create(researchOutputRequest),
      ).rejects.toThrow('Bad Request');
    });

    test('should throw when fails to create the research output - 500', async () => {
      const researchOutputRequest = getResearchOutputRequest();
      nock(config.baseUrl)
        .post(`/api/content/${config.appName}/research-outputs?publish=false`)
        .reply(500);

      await expect(
        researchOutputs.create(researchOutputRequest),
      ).rejects.toThrow('Internal Server');
    });
    test('should throw when research output cannot be found', async () => {
      const researchOutputRequest = getResearchOutputRequest();

      nock(config.baseUrl)
        .post(`/api/content/${config.appName}/research-outputs?publish=false`)
        .reply(201)
        .get(
          `/api/content/${config.appName}/teams/${researchOutputRequest.teamId}`,
        )
        .reply(404);

      await expect(
        researchOutputs.create(researchOutputRequest),
      ).rejects.toThrow('Not Found');
    });
    test('should throw when research output association cannot be made', async () => {
      const researchOutputRequest = getResearchOutputRequest();
      const teamId = researchOutputRequest.teamId;

      nock(config.baseUrl)
        .post(`/api/content/${config.appName}/research-outputs?publish=false`)
        .reply(201)
        .get(`/api/content/${config.appName}/teams/${teamId}`)
        .reply(200, { data: { id: teamId, outputs: { iv: ['output-1'] } } })
        .patch(`/api/content/${config.appName}/teams/${teamId}`)
        .reply(500);

      await expect(
        researchOutputs.create(researchOutputRequest),
      ).rejects.toThrow('Internal Server');
    });
  });
});

type Author = NonNullable<
  NonNullable<
    FetchResearchOutputQuery['findResearchOutputsContent']
  >['flatData']['authors']
>[number];
type InternalUser = Extract<Author, { __typename: 'Users' }>;
type ExternalUser = Extract<Author, { __typename: 'ExternalAuthors' }>;

type SquidexEntity = { [key: string]: { iv: unknown } };
function parseToSquidex(object: { [key: string]: unknown }): SquidexEntity {
  return Object.entries(object).reduce((acc, [key, value]) => {
    acc[key] = { iv: value };
    return acc;
  }, {} as SquidexEntity);
}
