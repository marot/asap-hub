import { useEffect, useState } from 'react';
import { useCurrentUser } from '@asap-hub/react-context';
import {
  algoliaSearchClientFactory,
  AlgoliaSearchClient,
} from '@asap-hub/algolia';
import { User } from '@asap-hub/auth';
<<<<<<< HEAD
import { ALGOLIA_APP_ID, ALGOLIA_INDEX } from '../config';
=======
import { ALGOLIA_INDEX } from '../config';
>>>>>>> refactor the client

export type AlgoliaHook = {
  client: AlgoliaSearchClient;
};

export const useAlgolia = () => {
  const initAlgolia = (user: User | null): AlgoliaHook => {
    if (!user) {
      throw new Error('Algolia unavailable while not logged in');
    }

<<<<<<< HEAD
    const client = algoliaSearchClientFactory({
      algoliaAppId: ALGOLIA_APP_ID,
      algoliaIndex: ALGOLIA_INDEX,
      algoliaApiKey: user.algoliaApiKey,
    });
=======
    const client = algoliaSearchClientFactory(
      ALGOLIA_INDEX,
      user.algoliaApiKey,
    );
>>>>>>> refactor the client

    return {
      client,
    };
  };
  const user = useCurrentUser();
  const [algolia, setAlgolia] = useState(initAlgolia(user));

  useEffect(() => {
    setAlgolia(initAlgolia(user));
  }, [user]);

  return algolia;
};
