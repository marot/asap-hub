import { gql, QueryOptions } from '@apollo/client';

import {
  ILabs,
  ILabsFields,
  IExternalAuthors,
  IExternalAuthorsFields,
  ISharedOutputs,
  ISharedOutputsFields,
  IUsers,
  IUsersFields,
} from '../../generated-contentful-types';

export const getSharedOutputById = (id: string): QueryOptions => ({
  query: gql`
    query getSharedOutputById($sharedOutputId: String!) {
      sharedOutputs(id: $sharedOutputId) {
        sys {
          id
        }
        title
        description {
          json
        }

        authorsCollection {
          items {
            __typename
            ... on ExternalAuthors {
              firstName
              lastName
              email
            }
            ... on Users {
              firstName
              lastName
              email
            }
          }
        }

        labsCollection {
          items {
            id
            name
          }
        }
      }
    }
  `,
  variables: {
    sharedOutputId: id,
  },
});

export type GetSharedOutputByIdResponse = Pick<
  ISharedOutputsFields,
  'id' | 'description' | 'title'
> & {
  sys: Pick<ISharedOutputs['sys'], 'id'>;
  authorsCollection: {
    items: (
      | ({
          __typename: 'Users';
          sys: Pick<IUsers['sys'], 'id'>;
        } & Pick<IUsersFields, 'firstName' | 'lastName' | 'email'>)
      | ({
          __typename: 'ExternalAuthors';
          sys: Pick<IExternalAuthors['sys'], 'id'>;
        } & Pick<IExternalAuthorsFields, 'firstName' | 'lastName' | 'email'>)
    )[];
  };
  labsCollection: {
    items: ({ sys: Pick<ILabs['sys'], 'id'> } & Pick<ILabsFields, 'name'>)[];
  };
};

export const getSharedOutputsCollection = (): QueryOptions => ({
  query: gql`
    query getSharedOutputs {
      sharedOutputsCollection {
        total
        items {
          sys {
            id
          }
          title
          description {
            json
          }

          authorsCollection {
            items {
              __typename
              ... on ExternalAuthors {
                firstName
                lastName
                email
              }
              ... on Users {
                firstName
                lastName
                email
              }
            }
          }

          labsCollection {
            items {
              id
              name
            }
          }
        }
      }
    }
  `,
  variables: {},
});

export type GetSharedOutputsCollectionResponse = {
  sharedOutputsCollection: {
    total: number;
    items: GetSharedOutputByIdResponse[];
  };
};
