import gql from 'graphql-tag';
import { newsQueryFragment } from './news.queries';

export const FETCH_DISCOVER = gql`
  query FetchDiscover {
    queryDiscoverContents {
      flatData {
        aboutUs
        training {
          ...News
        }
        pages {
          id
          created
          lastModified
          flatData {
            shortText
            text
            title
            link
            linkText
          }
        }
        members {
          id
          created
          lastModified
          flatData {
            avatar {
              id
            }
            email
            firstName
            institution
            jobTitle
            lastModifiedDate
            lastName
          }
        }
      }
    }
  }
  ${newsQueryFragment}
`;