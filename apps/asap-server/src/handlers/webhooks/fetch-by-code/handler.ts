/* istanbul ignore file */
<<<<<<< HEAD
import { algoliaSearchClientNativeFactory } from '@asap-hub/algolia';
import { SquidexGraphql } from '@asap-hub/squidex';
import { algoliaAppId, algoliaApiKey } from '../../../config';
=======
import { algoliaSearchClientNative } from '@asap-hub/algolia';
import { SquidexGraphql } from '@asap-hub/squidex';
>>>>>>> refactor the client
import Users from '../../../controllers/users';
import { Handler } from '../../../utils/types';
import { fetchUserByCodeHandlerFactory } from './fetch-by-code';

export const handler: Handler = fetchUserByCodeHandlerFactory(
  new Users(new SquidexGraphql()),
<<<<<<< HEAD
  algoliaSearchClientNativeFactory({ algoliaAppId, algoliaApiKey }),
=======
  algoliaSearchClientNative,
>>>>>>> refactor the client
);
