import Boom from '@hapi/boom';
import {
  RestTeam,
  RestUser,
  SquidexGraphqlClient,
  SquidexRestClient,
  SquidexRest,
} from '@asap-hub/squidex';
import { ListTeamResponse, TeamResponse, TeamTool } from '@asap-hub/model';

import { parseGraphQLTeam } from '../entities';
import { sanitiseForSquidex } from '../utils/squidex';
import { FETCH_TEAM, FETCH_TEAMS } from '../queries/teams.queries';
import {
  FetchTeamQuery,
  FetchTeamQueryVariables,
  FetchTeamsQuery,
  FetchTeamsQueryVariables,
} from '../gql/graphql';
import logger from '../utils/logger';

export interface TeamController {
  update: (id: string, tools: TeamTool[]) => Promise<TeamResponse>;
  fetch: (options: FetchTeamsOptions) => Promise<ListTeamResponse>;
  fetchById: (
    teamId: string,
    options?: FetchTeamOptions,
  ) => Promise<TeamResponse>;
}

type FetchTeamOptions = {
  showTools: boolean;
};

export type FetchTeamsOptions = {
  take: number;
  skip: number;
  search?: string;
  filter?: string | string[];
  // select team IDs of which tools should be returned
  // leave undefined to return all teams' tools
  showTeamTools?: string[];
};
export default class Teams implements TeamController {
  teamSquidexRestClient: SquidexRestClient<RestTeam>;
  userSquidexRestClient: SquidexRestClient<RestUser>;
  squidexGraphlClient: SquidexGraphqlClient;

  constructor(squidexGraphlClient: SquidexGraphqlClient) {
    this.squidexGraphlClient = squidexGraphlClient;
    this.userSquidexRestClient = new SquidexRest('users');
    this.teamSquidexRestClient = new SquidexRest('teams');
  }

  async update(id: string, tools: TeamTool[]): Promise<TeamResponse> {
    const cleanUpdate = tools.map((tool) =>
      Object.entries(tool).reduce(
        (acc, [key, value]) =>
          value?.trim && value?.trim() === ''
            ? acc // deleted field
            : { ...acc, [key]: value },
        {} as TeamTool,
      ),
    );

    await this.teamSquidexRestClient.patch(id, { tools: { iv: cleanUpdate } });
    return this.fetchById(id);
  }

  async fetch(options: FetchTeamsOptions): Promise<ListTeamResponse> {
    const { take = 8, skip = 0, search } = options;

    const searchQ = (search || '')
      .split(' ')
      .filter(Boolean) // removes whitespaces
      .map(sanitiseForSquidex)
      .reduce(
        (acc: string[], word: string) =>
          acc.concat(
            `(${[
              [`contains(data/displayName/iv, '${word}')`],
              [`contains(data/projectTitle/iv, '${word}')`],
              [`contains(data/expertiseAndResourceTags/iv, '${word}')`],
            ].join(' or ')})`,
          ),
        [],
      )
      .join(' and ');

    const { queryTeamsContentsWithTotal } =
      await this.squidexGraphlClient.request<
        FetchTeamsQuery,
        FetchTeamsQueryVariables
      >(FETCH_TEAMS, {
        filter: searchQ,
        top: take,
        skip,
      });

    if (queryTeamsContentsWithTotal === null) {
      logger.warn('queryTeamsContentsWithTotal returned null');
      return {
        total: 0,
        items: [],
      };
    }
    const { total, items: teams } = queryTeamsContentsWithTotal;

    if (teams === null) {
      logger.warn('queryTeamsContentsWithTotal items returned null');
      return {
        total: 0,
        items: [],
      };
    }

    return {
      total,
      items: teams.map((team) => {
        const parsedTeam = parseGraphQLTeam(team);

        if (!options.showTeamTools) {
          return parseGraphQLTeam(team);
        }

        if (options.showTeamTools.includes(parsedTeam.id)) {
          return parseGraphQLTeam(team);
        }

        return {
          ...parsedTeam,
          tools: undefined,
        };
      }),
    };
  }

  async fetchById(
    teamId: string,
    options?: FetchTeamOptions,
  ): Promise<TeamResponse> {
    const teamResponse = await this.squidexGraphlClient.request<
      FetchTeamQuery,
      FetchTeamQueryVariables
    >(FETCH_TEAM, { id: teamId });

    const { findTeamsContent: team } = teamResponse;

    if (!team) {
      throw Boom.notFound();
    }

    const parsedTeam = parseGraphQLTeam(team);

    if (options?.showTools === false) {
      return {
        ...parsedTeam,
        tools: undefined,
      };
    }

    return parsedTeam;
  }
}
