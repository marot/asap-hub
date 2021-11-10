import gql from 'graphql-tag';
import { teamsContentQueryFragment } from './teams.queries';

export const groupContentQueryFragment = gql`
  fragment GroupsContent on Groups {
    id
    created
    lastModified
    flatData {
      name
      description
      tags
      tools {
        slack
        googleDrive
      }
      teams {
        ...TeamsContent
      }
      leaders {
        role
        user {
          id
          created
          lastModified
          flatData {
            avatar {
              id
            }
            biography
            degree
            email
            contactEmail
            firstName
            institution
            jobTitle
            lastModifiedDate
            lastName
            country
            city
            onboarded
            orcid
            orcidLastModifiedDate
            orcidLastSyncDate
            orcidWorks {
              doi
              id
              lastModifiedDate
              publicationDate
              title
              type
            }
            questions {
              question
            }
            expertiseAndResourceTags
            expertiseAndResourceDescription
            teams {
              role
              mainResearchInterests
              responsibilities
              id {
                id
                flatData {
                  displayName
                  proposal {
                    id
                  }
                }
              }
            }
            social {
              github
              googleScholar
              linkedIn
              researcherId
              researchGate
              twitter
              website1
              website2
            }
            role
            responsibilities
            reachOut
            labs {
              id
              flatData {
                name
              }
            }
          }
        }
      }
      calendars {
        id
        flatData {
          color
          googleCalendarId
          name
        }
      }
      thumbnail {
        id
      }
    }
  }
  ${teamsContentQueryFragment}
`;

export const FETCH_GROUPS = gql`
  query FetchGroups(
    $top: Int
    $skip: Int
    $filter: String
    $withResearchOutputs: Boolean = false
    $withTeams: Boolean = false
  ) {
    queryGroupsContentsWithTotal(
      top: $top
      skip: $skip
      filter: $filter
      orderby: "data/name/iv"
    ) {
      total
      items {
        ...GroupsContent
      }
    }
  }
  ${groupContentQueryFragment}
`;

export const FETCH_GROUP = gql`
  query FetchGroup(
    $id: String!
    $withResearchOutputs: Boolean = false
    $withTeams: Boolean = false
  ) {
    findGroupsContent(id: $id) {
      ...GroupsContent
    }
  }
  ${groupContentQueryFragment}
`;
