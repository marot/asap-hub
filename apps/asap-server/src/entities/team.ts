import Joi from '@hapi/joi';
import {
  TeamResponse,
  TeamRole,
  TeamMember,
  Lab,
  TeamTool,
  teamRole,
} from '@asap-hub/model';

import { parseDate, createURL } from '../utils/squidex';
import { FetchTeamQuery } from '../gql/graphql';

export const teamUpdateSchema = Joi.object({
  tools: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().allow(''),
      }),
    )
    .required(),
})
  .min(1)
  .required();

const priorities: Record<TeamRole, number> = {
  'Lead PI (Core Leadership)': 1,
  'Project Manager': 2,
  'Co-PI (Core Leadership)': 3,
  'Collaborating PI': 4,
  'Key Personnel': 5,
};

export const parseGraphQLTeamMember = (
  user: NonNullable<
    NonNullable<FetchTeamQuery['findTeamsContent']>['referencingUsersContents']
  >[number],
  teamId: string,
): TeamMember => {
  const flatAvatar = user.flatData.avatar || [];

  const labs = user.flatData.labs?.reduce((acc: Lab[], lab) => {
    const labsData = lab.flatData?.name
      ? [...acc, { id: lab.id, name: lab.flatData.name }]
      : acc;
    return labsData;
  }, []);

  const role = user.flatData.teams
    ?.filter((t) => t.id && t.id[0]?.id === teamId)
    .filter((s) => s.role)[0]?.role;

  if (typeof role === 'undefined' || !isTeamRole(role)) {
    throw new Error(`Invalid team role on user ${user.id} : ${role}`);
  }

  if (!user.flatData.email) {
    throw new Error(`Email is missing in user ${user.id}`);
  }

  return {
    id: user.id,
    email: user.flatData.email,
    firstName: user.flatData.firstName ?? undefined,
    lastName: user.flatData.lastName ?? undefined,
    displayName: `${user.flatData.firstName} ${user.flatData.lastName}`,
    role,
    labs,
    avatarUrl: flatAvatar.length
      ? createURL(flatAvatar.map((a) => a.id))[0]
      : undefined,
  };
};

export const parseGraphQLTeam = (
  team: NonNullable<FetchTeamQuery['findTeamsContent']>,
): TeamResponse => {
  const displayName = team.flatData.displayName || '';

  const members =
    team.referencingUsersContents?.map((user) =>
      parseGraphQLTeamMember(user, team.id),
    ) || [];

  const tools =
    team.flatData.tools?.reduce((teamTools, { name, description, url }) => {
      if (!name || !url) {
        return teamTools;
      }
      return [
        ...teamTools,
        {
          name,
          url,
          description: description ?? undefined,
        },
      ];
    }, [] as TeamTool[]) || [];

  const labCount = members
    .flatMap((member) => member.labs || [])
    .filter(
      (lab, index, labs) => labs.findIndex((l) => l.id === lab.id) === index,
    ).length;

  if (!team.flatData.projectTitle) {
    throw new Error(`Project Title is missing in team ${team.id}`);
  }

  return {
    id: team.id,
    displayName,
    labCount,
    projectTitle: team.flatData.projectTitle,
    lastModifiedDate: parseDate(team.lastModified).toISOString(),
    expertiseAndResourceTags: team.flatData.expertiseAndResourceTags ?? [],
    tools,
    pointOfContact: members.find(({ role }) => role === 'Project Manager'),
    members: members.sort((a, b) => priorities[a.role] - priorities[b.role]),
    projectSummary: team.flatData.projectSummary ?? undefined,
    proposalURL: team.flatData.proposal
      ? team.flatData.proposal[0]?.id
      : undefined,
  };
};

export const isTeamRole = (data: string | null): data is TeamRole =>
  teamRole.includes(data as TeamRole);
