import Joi from '@hapi/joi';
import {
  OrcidWork,
  UserResponse,
  UserTeam,
  Lab,
  UserDegree,
  userDegree,
  OrcidWorkType,
  orcidWorkType,
  Role,
  userRole,
} from '@asap-hub/model';
import { RestUser } from '@asap-hub/squidex';

import { parseDate, createURL } from '../utils/squidex';
import { FetchUserQuery, UsersContentFragment } from '../gql/graphql';
import { isTeamRole } from './team';
import logger from '../utils/logger';

export type CMSOrcidWork = OrcidWork;

export const userUpdateSchema = Joi.object({
  onboarded: Joi.boolean(),
  contactEmail: Joi.string().allow(''),
  firstName: Joi.string().allow(''),
  lastName: Joi.string().allow(''),
  jobTitle: Joi.string().allow(''),
  degree: Joi.string()
    .allow('BA', 'BSc', 'MSc', 'PhD', 'MD', 'PhD, MD')
    .allow(''),
  institution: Joi.string().allow(''),
  biography: Joi.string().allow(''),
  country: Joi.string().allow(''),
  city: Joi.string().allow(''),
  expertiseAndResourceTags: Joi.array().items(Joi.string()),
  expertiseAndResourceDescription: Joi.string().allow(''),
  researchInterests: Joi.string().allow(''),
  responsibilities: Joi.string().allow(''),
  questions: Joi.array().items(Joi.string()),
  teams: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      responsibilities: Joi.string().allow(''),
      mainResearchInterests: Joi.string().allow(''),
    })
      .min(2)
      .required(),
  ),
  social: Joi.object({
    website1: Joi.string(),
    website2: Joi.string(),
    linkedIn: Joi.string(),
    researcherId: Joi.string(),
    twitter: Joi.string(),
    github: Joi.string(),
    googleScholar: Joi.string(),
    researchGate: Joi.string(),
  }),
})
  .min(1)
  .required();

export type GraphqlUserTeam = NonNullable<
  NonNullable<FetchUserQuery['findUsersContent']>['flatData']['teams']
>[number];

export const parseGraphQLUserTeamConnections = (
  teams: GraphqlUserTeam[],
): UserTeam[] =>
  teams.reduce((acc: UserTeam[], item) => {
    if (item.id === null || !item.id[0]) {
      logger.warn(`Team Connection is undefined`);
      return acc;
    }
    const team = item.id[0];
    const displayName = team.flatData?.displayName;
    const proposal = team.flatData?.proposal;
    if (!item.role || !isTeamRole(item.role)) {
      logger.warn(`Invalid team role: ${item.role}`);
      return acc;
    }
    return [
      ...acc,
      {
        id: team.id,
        role: item.role,
        mainResearchInterests: item.mainResearchInterests
          ? item.mainResearchInterests
          : undefined,
        responsibilities: item.responsibilities
          ? item.responsibilities
          : undefined,
        proposal: proposal?.length ? proposal[0]?.id : undefined,
        displayName: displayName || '',
      },
    ];
  }, []);

type GraphQLUserRequiredFlatDataProperties =
  | 'email'
  | 'firstName'
  | 'institution'
  | 'jobTitle'
  | 'lastModifiedDate'
  | 'lastName';
type GraphQLUserFlatData = UsersContentFragment['flatData'];
type GraphQLUserRequiredFlatData = Pick<
  GraphQLUserFlatData,
  GraphQLUserRequiredFlatDataProperties
>;
type GraphQLUserOptionalFlatData = Partial<
  Omit<GraphQLUserFlatData, GraphQLUserRequiredFlatDataProperties>
>;
type GraphQLUser = Omit<UsersContentFragment, 'flatData'> & {
  flatData: GraphQLUserRequiredFlatData & GraphQLUserOptionalFlatData;
};

export const parseGraphQLUser = (item: GraphQLUser): UserResponse => {
  const flatTeams = item.flatData.teams || [];
  const flatAvatar = item.flatData.avatar || [];
  const flatQuestions = item.flatData.questions || [];
  const flatExpertiseAndResourceTags =
    item.flatData.expertiseAndResourceTags || [];
  const createdDate = parseDate(item.created).toISOString();

  const role =
    item.flatData.role && isUserRole(item.flatData.role)
      ? item.flatData.role
      : 'Guest';
  const teams = parseGraphQLUserTeamConnections(flatTeams || []);

  const orcid = item.flatData.orcid || undefined;
  // merge both and remove null values
  const social = Object.entries({
    ...((item.flatData.social && item.flatData.social[0]) || {}),
    orcid,
  }).reduce((acc, [k, v]) => {
    if (!v) {
      return acc;
    }
    return { ...acc, [k]: v };
  }, {} as { [key: string]: string });

  const displayName = `${item.flatData.firstName} ${item.flatData.lastName}`;

  const flatLabs =
    item.flatData.labs?.reduce<Lab[]>((labs, lab) => {
      // skip Labs without names
      if (!lab.flatData.name) {
        return labs;
      }
      return [
        ...labs,
        {
          name: lab.flatData.name || '',
          id: lab.id,
        },
      ];
    }, []) || [];

  return {
    id: item.id,
    onboarded:
      item.flatData && typeof item.flatData.onboarded === 'boolean'
        ? item.flatData.onboarded
        : true,
    createdDate,
    displayName,
    orcid, // TODO: remove once edit social is added
    firstName: item.flatData.firstName || '',
    lastName: item.flatData.lastName || '',
    biography: item.flatData.biography || undefined,
    degree:
      item.flatData.degree && isUserDegree(item.flatData.degree)
        ? item.flatData.degree
        : undefined,
    email: item.flatData.email || '',
    contactEmail: item.flatData.contactEmail || undefined,
    institution: item.flatData.institution || undefined,
    jobTitle: item.flatData.jobTitle || undefined,
    country: item.flatData.country || undefined,
    city: item.flatData.city || undefined,
    orcidWorks:
      item.flatData.orcidWorks
        ?.reduce<OrcidWork[]>((orcidWorks, orcidWork) => {
          if (orcidWork.id === null || orcidWork.lastModifiedDate === null) {
            return orcidWorks;
          }

          return [
            ...orcidWorks,
            {
              id: orcidWork.id,
              doi: orcidWork.doi || undefined,
              title: orcidWork.title || undefined,
              type:
                orcidWork.type && isOrcidWorkType(orcidWork.type)
                  ? orcidWork.type
                  : 'UNDEFINED',
              publicationDate: orcidWork.publicationDate,
              lastModifiedDate: orcidWork.lastModifiedDate,
            },
          ];
        }, [])
        .slice(0, 5) || [],
    questions:
      flatQuestions
        .map((q) => q.question)
        .filter<string>((q): q is string => typeof q === 'string') || [],
    expertiseAndResourceTags: flatExpertiseAndResourceTags,
    expertiseAndResourceDescription:
      item.flatData.expertiseAndResourceDescription ?? undefined,
    lastModifiedDate: item.flatData.lastModifiedDate || createdDate,
    teams,
    social,
    avatarUrl: flatAvatar?.length
      ? createURL(flatAvatar.map((a) => a.id))[0]
      : undefined,
    role,
    responsibilities: item.flatData.responsibilities || undefined,
    researchInterests: item.flatData.researchInterests ?? undefined,
    reachOut: item.flatData.reachOut || undefined,
    labs: flatLabs || [],
  };
};

export const parseUser = (user: RestUser): UserResponse => {
  const teams: UserTeam[] =
    user.data.teams?.iv?.reduce((acc: UserTeam[], team) => {
      const { id, ...t } = team;
      if (!id[0]) {
        logger.warn(`Team id is undefined on user: ${user.id}`);
        return acc;
      }
      return [
        ...acc,
        {
          id: id[0],
          displayName: 'Unknown',
          ...t,
          mainResearchInterests: t.mainResearchInterests
            ? t.mainResearchInterests
            : undefined,
          responsibilities: t.responsibilities ? t.responsibilities : undefined,
        },
      ];
    }, []) || [];

  const orcid = user.data.orcid?.iv;
  const social = {
    ...((user.data.social?.iv && user.data.social?.iv[0]) || {}),
    orcid,
  };

  const displayName = `${user.data.firstName.iv} ${user.data.lastName.iv}`;

  return {
    id: user.id,
    displayName,
    onboarded: user.data.onboarded.iv,
    createdDate: parseDate(user.created).toISOString(),
    lastModifiedDate: user.data.lastModifiedDate?.iv ?? user.created,
    email: user.data.email.iv,
    contactEmail: user.data?.contactEmail?.iv,
    degree: user.data.degree?.iv,
    firstName: user.data.firstName?.iv,
    lastName: user.data.lastName?.iv,
    biography: user.data.biography?.iv,
    jobTitle: user.data.jobTitle?.iv,
    institution: user.data.institution?.iv,
    teams,
    social,
    orcid: user.data.orcid?.iv,
    orcidLastModifiedDate: user.data.orcidLastModifiedDate?.iv,
    orcidWorks: user.data.orcidWorks?.iv,
    expertiseAndResourceTags: user.data.expertiseAndResourceTags?.iv || [],
    expertiseAndResourceDescription:
      user.data.expertiseAndResourceDescription?.iv,
    questions: user.data.questions?.iv?.map(({ question }) => question) || [],
    avatarUrl:
      (user.data.avatar?.iv && createURL(user.data.avatar.iv)[0]) ?? undefined,
    role: user.data.role.iv === 'Hidden' ? 'Guest' : user.data.role.iv,
    responsibilities: user.data.responsibilities?.iv,
    researchInterests: user.data.researchInterests?.iv ?? undefined,
    reachOut: user.data.reachOut?.iv,
    labs: (user.data.labs?.iv || []).map((lab) => ({
      id: lab.id,
      name: lab.flatData?.name ?? '',
    })),
  };
};

const isUserRole = (data: string): data is Role =>
  (userRole as ReadonlyArray<string>).includes(data);

const isUserDegree = (data: string): data is UserDegree =>
  (userDegree as ReadonlyArray<string>).includes(data);

const isOrcidWorkType = (data: string): data is OrcidWorkType =>
  (orcidWorkType as ReadonlyArray<string>).includes(data);
