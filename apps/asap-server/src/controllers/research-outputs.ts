import {
  ListResearchOutputResponse,
  ResearchOutputPostRequest,
  ResearchOutputResponse,
} from '@asap-hub/model';
import {
  RestResearchOutput,
  RestTeam,
  SquidexGraphqlClient,
  SquidexRest,
  SquidexRestClient,
} from '@asap-hub/squidex';
import Boom from '@hapi/boom';
import {
  FetchResearchOutputQuery,
  FetchResearchOutputQueryVariables,
  FetchResearchOutputsQuery,
  FetchResearchOutputsQueryVariables,
} from '../autogenerated-gql/graphql';
import {
  convertBooleanToDecision,
  parseGraphQLResearchOutput,
} from '../entities/research-output';
import {
  FETCH_RESEARCH_OUTPUT,
  FETCH_RESEARCH_OUTPUTS,
} from '../queries/research-outputs.queries';
import logger from '../utils/logger';
import { parseToSquidex, sanitiseForSquidex } from '../utils/squidex';

export default class ResearchOutputs implements ResearchOutputController {
  squidexGraphqlClient: SquidexGraphqlClient;
  researchOutputSquidexRestClient: SquidexRestClient<RestResearchOutput>;
  teamSquidexRestClient: SquidexRestClient<RestTeam>;

  constructor(squidexGraphqlClient: SquidexGraphqlClient) {
    this.squidexGraphqlClient = squidexGraphqlClient;
    this.researchOutputSquidexRestClient = new SquidexRest('research-outputs');
    this.teamSquidexRestClient = new SquidexRest('teams', {
      unpublished: true,
    });
  }

  async fetchById(id: string): Promise<ResearchOutputResponse> {
    const researchOutputGraphqlResponse =
      await this.squidexGraphqlClient.request<
        FetchResearchOutputQuery,
        FetchResearchOutputQueryVariables
      >(FETCH_RESEARCH_OUTPUT, { id, withTeams: true });

    const { findResearchOutputsContent: researchOutputContent } =
      researchOutputGraphqlResponse;

    if (!researchOutputContent) {
      throw Boom.notFound();
    }

    return parseGraphQLResearchOutput(researchOutputContent, {
      includeAuthors: true,
      includeTeams: true,
    }) as ResearchOutputResponse;
  }

  async fetch(options: {
    take: number;
    skip: number;
    search?: string;
    filter?: string[];
  }): Promise<ListResearchOutputResponse> {
    const { search, filter, take = 8, skip = 0 } = options;

    const searchQ = (search || '')
      .split(' ')
      .filter(Boolean)
      .map(sanitiseForSquidex)
      .reduce(
        (acc: string[], word: string) =>
          acc.concat(
            `contains(data/title/iv, '${word}') or contains(data/tags/iv, '${word}')`,
          ),
        [],
      )
      .join(' or ');

    const filterQ = (filter || [])
      .reduce(
        (acc: string[], word: string) =>
          acc.concat([`data/type/iv eq '${word}'`]),
        [],
      )
      .join(' or ');

    const filterGraphql = [filterQ && `(${filterQ})`, searchQ && `(${searchQ})`]
      .filter(Boolean)
      .join(' and ');

    const { queryResearchOutputsContentsWithTotal } =
      await this.squidexGraphqlClient.request<
        FetchResearchOutputsQuery,
        FetchResearchOutputsQueryVariables
      >(FETCH_RESEARCH_OUTPUTS, {
        top: take,
        skip,
        filter: filterGraphql,
        withTeams: true,
      });

    if (queryResearchOutputsContentsWithTotal === null) {
      logger.warn('queryResearchOutputsContentsWithTotal returned null');
      return {
        total: 0,
        items: [],
      };
    }

    const { total, items: researchOutputs } =
      queryResearchOutputsContentsWithTotal;

    if (researchOutputs === null) {
      logger.warn('queryResearchOutputsContentsWithTotal items returned null');
      return {
        total: 0,
        items: [],
      };
    }

    return {
      total,
      items: researchOutputs.map(
        (item) =>
          parseGraphQLResearchOutput(item, {
            includeAuthors: true,
            includeTeams: true,
          }) as ResearchOutputResponse,
      ),
    };
  }
  async create({
    teams,
    ...researchOutputData
  }: ResearchOutputInputData): Promise<Partial<ResearchOutputResponse>> {
    const { id: researchOutputId } = await this.createResearchOutput(
      researchOutputData,
    );
    await Promise.all(
      teams.map((teamId) =>
        this.associateResearchOutputToTeam(teamId, researchOutputId),
      ),
    );

    return { id: researchOutputId };
  }
  private async createResearchOutput({
    subTypes,
    ...researchOutputData
  }: Omit<ResearchOutputPostRequest, 'teams'>) {
    const { usedInPublication, ...researchOutput } = parseToSquidex({
      ...researchOutputData,
      ...(subTypes[0] && { subtype: subTypes[0] }),
      asapFunded: convertBooleanToDecision(researchOutputData.asapFunded),
      usedInPublication: convertBooleanToDecision(
        researchOutputData.usedInPublication,
      ),
    });

    return this.researchOutputSquidexRestClient.create(
      {
        ...researchOutput,
        usedInAPublication: usedInPublication,
      } as RestResearchOutput['data'],
      false,
    );
  }

  private async associateResearchOutputToTeam(
    teamId: string,
    researchOutputId: string,
  ) {
    const { data } = await this.teamSquidexRestClient.fetchById(teamId);

    const existingOutputs = data.outputs?.iv || [];
    await this.teamSquidexRestClient.patch(teamId, {
      outputs: {
        iv: [...existingOutputs, researchOutputId],
      },
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
  create: (
    researchOutputRequest: ResearchOutputInputData,
  ) => Promise<Partial<ResearchOutputResponse>>;
}
export type ResearchOutputInputData = ResearchOutputPostRequest;
