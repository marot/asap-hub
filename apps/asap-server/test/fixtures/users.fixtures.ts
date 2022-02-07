import { ListUserResponse, UserPatchRequest } from '@asap-hub/model';
import { UserResponse } from '@asap-hub/model';
import { RestUser, WebhookPayload, User } from '@asap-hub/squidex';
import {
  FetchUserQuery,
  FetchUsersQuery,
} from '../../src/autogenerated-gql/graphql';
import { UserEventType } from '../../src/handlers/webhooks/webhook-user';
import { createEventBridgeEventMock } from '../helpers/events';

export const getSquidexUsersGraphqlResponse = (): FetchUsersQuery =>
  generateGraphqlFetchUsersResponse([getGraphQLUser()]);

export const getSquidexUserGraphqlResponse = (): FetchUserQuery => ({
  findUsersContent: getGraphQLUser(),
});

const generateGraphqlFetchUsersResponse = (
  items: NonNullable<FetchUserQuery['findUsersContent']>[],
): FetchUsersQuery => ({
  queryUsersContentsWithTotal: {
    total: items.length,
    items,
  },
});

export const getGraphqlResponseFetchUsers = (): FetchUsersQuery =>
  generateGraphqlFetchUsersResponse([
    getGraphQLUser(),
    getGraphQLUser({
      id: 'user-id-2',
      flatData: {
        biography: 'some biography',
        orcidWorks: [
          {
            doi: 'test-doi',
            id: '987-654-321',
            lastModifiedDate: '2020-10-26T15:33:18Z',
            publicationDate: {},
            type: 'BOOK',
            title: 'orcid work title 2',
          },
        ],
        city: 'some city',
        country: 'some country',
        contactEmail: 'some@contact.email',
        degree: 'some degree',
        orcid: 'orcid',
        email: 'iwillbeback@arnold.com',
        firstName: 'Arnold',
        lastName: 'Schwatzneger',
        expertiseAndResourceDescription: 'Amazing person',
        social: [
          {
            github: 'awesome',
          },
        ],
        teams: [
          {
            role: 'Project Manager',
            id: [
              {
                id: 'team-id-2',
                flatData: {
                  displayName: 'Team B',
                  proposal: [{ id: 'proposalId' }],
                },
              },
            ],
          },
        ],
        labs: [] as NonNullable<GraphQLUserTeamFlatData['labs']>,
        expertiseAndResourceTags: [] as NonNullable<
          GraphQLUserTeamFlatData['expertiseAndResourceTags']
        >,
        questions: [] as NonNullable<GraphQLUserTeamFlatData['questions']>,
      } as GraphQLUserTeamFlatData,
    }),
  ]);

export const getGraphQLUser = (
  user: Partial<NonNullable<FetchUserQuery['findUsersContent']>> = {},
): NonNullable<FetchUserQuery['findUsersContent']> => ({
  id: 'user-id-1',
  lastModified: '2020-10-26T15:33:18Z',
  version: 42,
  created: '2020-09-23T20:45:22Z',
  ...user,
  flatData: {
    biography: 'some bio',
    institution: 'some institution',
    jobTitle: 'some job title',
    onboarded: true,
    orcidLastModifiedDate: null,
    orcidLastSyncDate: null,
    reachOut: 'some reach out',
    responsibilities: 'some responsibilities',
    researchInterests: 'some research interests',
    avatar: [],
    email: 'H@rdy.io',
    contactEmail: 'T@rdy.io',
    firstName: 'Tom',
    lastName: 'Hardy',
    country: 'United Kingdom',
    city: 'London',
    lastModifiedDate: '',
    questions: [{ question: 'Question 1' }, { question: 'Question 2' }],
    expertiseAndResourceDescription: null,
    orcid: '123-456-789',
    social: null,
    degree: 'MPH',
    role: 'Grantee',
    ...user?.flatData,
    expertiseAndResourceTags: user?.flatData?.expertiseAndResourceTags || [
      'expertise 1',
      'expertise 2',
      'expertise 3',
      'expertise 4',
      'expertise 5',
    ],
    orcidWorks: user?.flatData?.orcidWorks || [
      {
        id: '123-456-789',
        doi: 'test-doi',
        type: 'ANNOTATION',
        lastModifiedDate: '2020-10-26T15:33:18Z',
        publicationDate: {},
        title: 'orcid work title',
      },
    ],
    teams: user?.flatData?.teams || [
      {
        role: 'Lead PI (Core Leadership)',
        id: [
          {
            id: 'team-id-1',
            flatData: {
              displayName: 'Team A',
              proposal: [{ id: 'proposalId1' }],
            },
          },
        ],
      },
    ],
    labs: user?.flatData?.labs || [
      { id: 'cd7be4902', flatData: { name: 'Brighton' } },
      { id: 'cd7be4903', flatData: { name: 'Liverpool' } },
    ],
  },
});

type GraphQLUserTeamFlatData = NonNullable<
  FetchUserQuery['findUsersContent']
>['flatData'];

export const patchResponse: RestUser = {
  id: 'userId',
  data: {
    onboarded: { iv: true },
    reachOut: { iv: 'some reach out' },
    responsibilities: { iv: 'some responsibilities' },
    expertiseAndResourceDescription: { iv: 'some expertiseAndResourceTags' },
    role: { iv: 'Grantee' },
    lastModifiedDate: { iv: '2020-09-25T09:42:51.132Z' },
    email: { iv: 'cristiano@ronaldo.com' },
    firstName: { iv: 'Cristiano' },
    lastName: { iv: 'Ronaldo' },
    jobTitle: { iv: 'Junior' },
    orcid: { iv: '363-98-9330' },
    institution: { iv: 'Dollar General Corporation' },
    country: { iv: 'United Kingdom' },
    city: { iv: 'Brighton' },
    avatar: { iv: ['squidex-asset-id'] },
    expertiseAndResourceTags: { iv: [] },
    orcidWorks: { iv: [] },
    teams: {
      iv: [
        {
          id: ['team-id-1'],
          role: 'Lead PI (Core Leadership)',
        },
        {
          id: ['team-id-3'],
          role: 'Collaborating PI',
        },
      ],
    },
    connections: { iv: [] },
    questions: { iv: [] },
    labs: { iv: [] },
  },
  created: '2020-09-25T09:42:51Z',
  lastModified: '2020-09-25T09:42:51Z',
  version: 42,
};
export const fetchUserResponse = patchResponse;

export const updateAvatarBody: { avatar: string } = {
  avatar:
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBkRXhpZgAATU0AKgAAAAgABAEGAAMAAAABAAIAAAESAAMAAAABAAEAAAEoAAMAAAABAAIAAIdpAAQAAAABAAAAPgAAAAAAAqACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAAD/4QkhaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+AP/tADhQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAADhCSU0EJQAAAAAAENQdjNmPALIE6YAJmOz4Qn7/4gI0SUNDX1BST0ZJTEUAAQEAAAIkYXBwbAQAAABtbnRyUkdCIFhZWiAH4QAHAAcADQAWACBhY3NwQVBQTAAAAABBUFBMAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWFwcGzKGpWCJX8QTTiZE9XR6hWCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApkZXNjAAAA/AAAAGVjcHJ0AAABZAAAACN3dHB0AAABiAAAABRyWFlaAAABnAAAABRnWFlaAAABsAAAABRiWFlaAAABxAAAABRyVFJDAAAB2AAAACBjaGFkAAAB+AAAACxiVFJDAAAB2AAAACBnVFJDAAAB2AAAACBkZXNjAAAAAAAAAAtEaXNwbGF5IFAzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRleHQAAAAAQ29weXJpZ2h0IEFwcGxlIEluYy4sIDIwMTcAAFhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAIPfAAA9v////7tYWVogAAAAAAAASr8AALE3AAAKuVhZWiAAAAAAAAAoOAAAEQsAAMi5cGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltzZjMyAAAAAAABDEIAAAXe///zJgAAB5MAAP2Q///7ov///aMAAAPcAADAbv/AABEIAAEAAQMBEQACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/3QAEAAH/2gAMAwEAAhEDEQA/AMev53P7QP/Z',
};

export const getUserResponse = (): UserResponse => ({
  id: 'user-id-1',
  biography: 'some bio',
  onboarded: true,
  createdDate: '2020-09-23T20:45:22.000Z',
  questions: ['Question 1', 'Question 2'],
  expertiseAndResourceTags: [
    'expertise 1',
    'expertise 2',
    'expertise 3',
    'expertise 4',
    'expertise 5',
  ],
  displayName: 'Tom Hardy',
  institution: 'some institution',
  jobTitle: 'some job title',
  reachOut: 'some reach out',
  responsibilities: 'some responsibilities',
  researchInterests: 'some research interests',
  email: 'H@rdy.io',
  contactEmail: 'T@rdy.io',
  firstName: 'Tom',
  lastName: 'Hardy',
  country: 'United Kingdom',
  city: 'London',
  lastModifiedDate: '2020-09-23T20:45:22.000Z',
  orcidWorks: [
    {
      doi: 'test-doi',
      id: '123-456-789',
      lastModifiedDate: '2020-10-26T15:33:18Z',
      publicationDate: {},
      type: 'ANNOTATION',
      title: 'orcid work title',
    },
  ],
  orcid: '123-456-789',
  degree: 'MPH',
  social: {
    orcid: '123-456-789',
  },
  teams: [
    {
      id: 'team-id-1',
      role: 'Lead PI (Core Leadership)',
      displayName: 'Team A',
      proposal: 'proposalId1',
    },
  ],
  role: 'Grantee',
  labs: [
    { id: 'cd7be4902', name: 'Brighton' },
    { id: 'cd7be4903', name: 'Liverpool' },
  ],
});

export const fetchExpectation: ListUserResponse = {
  total: 2,
  items: [
    getUserResponse(),
    {
      id: 'user-id-2',
      biography: 'some biography',
      city: 'some city',
      contactEmail: 'some@contact.email',
      country: 'some country',
      institution: 'some institution',
      jobTitle: 'some job title',
      orcid: 'orcid',
      reachOut: 'some reach out',
      responsibilities: 'some responsibilities',
      researchInterests: 'some research interests',
      onboarded: true,
      createdDate: '2020-09-23T20:45:22.000Z',
      questions: [],
      expertiseAndResourceTags: [],
      expertiseAndResourceDescription: 'Amazing person',
      displayName: 'Arnold Schwatzneger',
      email: 'iwillbeback@arnold.com',
      firstName: 'Arnold',
      lastName: 'Schwatzneger',
      lastModifiedDate: '2020-09-23T20:45:22.000Z',
      orcidWorks: [
        {
          doi: 'test-doi',
          id: '987-654-321',
          lastModifiedDate: '2020-10-26T15:33:18Z',
          publicationDate: {},
          type: 'BOOK',
          title: 'orcid work title 2',
        },
      ],
      social: {
        github: 'awesome',
        orcid: 'orcid',
      },
      teams: [
        {
          id: 'team-id-2',
          role: 'Project Manager',
          displayName: 'Team B',
          proposal: 'proposalId',
        },
      ],
      role: 'Grantee',
      labs: [],
    },
  ],
};

export const getListUserResponse = (): ListUserResponse => ({
  total: 1,
  items: [getUserResponse()],
});

export const restUserMock = patchResponse;

export const userPatchRequest: UserPatchRequest = {
  social: { github: 'johnytiago' },
  jobTitle: 'CEO',
  questions: ['To be or not to be?'],
  onboarded: true,
  country: 'United Kingdom',
  city: 'Manchester',
  responsibilities: 'responsibilities',
  researchInterests: 'research interests',
  teams: [
    {
      id: 'team-id-1',
    },
  ],
};

export const updateUserEvent: WebhookPayload<User> = {
  type: 'UsersUpdated',
  timestamp: '2021-02-15T13:11:25Z',
  payload: {
    $type: 'EnrichedContentEvent',
    type: 'Updated',
    id: 'userId',
    created: '2020-07-31T14:11:58Z',
    lastModified: '2020-07-31T15:49:41Z',
    version: 42,
    data: {
      role: {
        iv: 'Grantee',
      },
      lastModifiedDate: {
        iv: '2020-08-26T16:36:47.984Z',
      },
      firstName: { iv: 'Bill' },
      lastName: { iv: 'Grades' },
      connections: {
        iv: [
          {
            code: 'c6fdb21b-32f3-4549-ac17-d0c83dc5335b',
          },
        ],
      },
      email: {
        iv: 'ti@sief.tg',
      },
      orcid: {
        iv: 'notChanged',
      },
      avatar: { iv: [] },
      expertiseAndResourceTags: { iv: [] },
      questions: { iv: [] },
      teams: { iv: [] },
      onboarded: {
        iv: true,
      },
      labs: { iv: [] },
    },
    dataOld: {
      firstName: { iv: 'Bill' },
      lastName: { iv: 'Grades' },
      role: {
        iv: 'Grantee',
      },
      lastModifiedDate: {
        iv: '2020-08-26T16:36:47.984Z',
      },
      connections: {
        iv: [
          {
            code: 'c6fdb21b-32f3-4549-ac17-d0c83dc5335b',
          },
        ],
      },
      email: {
        iv: 'ti@sief.tg',
      },
      orcid: {
        iv: 'notChanged',
      },
      avatar: { iv: [] },
      expertiseAndResourceTags: { iv: [] },
      questions: { iv: [] },
      teams: { iv: [] },
      onboarded: {
        iv: true,
      },
      labs: { iv: [] },
    },
  },
};

export const userPublishedEvent: WebhookPayload<User> = {
  type: 'UsersPublished',
  timestamp: '2021-02-15T13:11:25Z',
  payload: {
    $type: 'EnrichedContentEvent',
    type: 'Published',
    id: 'userId',
    created: '2020-07-31T15:52:33Z',
    lastModified: '2020-07-31T15:52:33Z',
    version: 42,
    data: {
      firstName: { iv: 'Gil' },
      lastName: { iv: 'Eanes' },
      role: {
        iv: 'Grantee',
      },
      avatar: { iv: [] },
      expertiseAndResourceTags: { iv: [] },
      questions: { iv: [] },
      teams: { iv: [] },
      lastModifiedDate: {
        iv: '2020-08-26T16:36:47.984Z',
      },
      connections: {
        iv: [
          {
            code: 'c6fdb21b-32f3-4549-ac17-d0c83dc5335b',
          },
        ],
      },
      orcid: {
        iv: '0000-0002-9079-593X',
      },
      email: {
        iv: 'webhokk@ola.io',
      },
      onboarded: {
        iv: true,
      },
      labs: { iv: [] },
    },
  },
};

export const getUserWebhookPayload = (
  id: string,
  type:
    | 'UsersCreated'
    | 'UsersPublished'
    | 'UsersUpdated'
    | 'UsersUnpublished'
    | 'UsersDeleted',
): WebhookPayload<User> => ({
  type,
  timestamp: '2021-02-15T13:11:25Z',
  payload: {
    $type: 'EnrichedContentEvent',
    type: 'Updated',
    id,
    created: '2020-07-31T15:52:33Z',
    lastModified: '2020-07-31T15:52:33Z',
    version: 42,
    data: {
      firstName: { iv: 'Gil' },
      lastName: { iv: 'Eanes' },
      role: {
        iv: 'Grantee',
      },
      avatar: { iv: [] },
      expertiseAndResourceTags: { iv: [] },
      questions: { iv: [] },
      teams: { iv: [] },
      lastModifiedDate: {
        iv: '2020-08-26T16:36:47.984Z',
      },
      connections: {
        iv: [
          {
            code: 'c6fdb21b-32f3-4549-ac17-d0c83dc5335b',
          },
        ],
      },
      orcid: {
        iv: '0000-0002-9079-593X',
      },
      email: {
        iv: 'webhokk@ola.io',
      },
      onboarded: {
        iv: true,
      },
      labs: { iv: [] },
    },
  },
});

export const getUserEvent = (
  id: string,
  squidexEvent:
    | 'UsersPublished'
    | 'UsersUpdated'
    | 'UsersUnpublished'
    | 'UsersDeleted',
  eventType: UserEventType,
) =>
  createEventBridgeEventMock(
    getUserWebhookPayload(id, squidexEvent),
    eventType,
    id,
  );
