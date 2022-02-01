<<<<<<< HEAD
<<<<<<< HEAD
import { EventBridgeEvent } from 'aws-lambda';
import { SquidexGraphql } from '@asap-hub/squidex';
import {
  AlgoliaSearchClient,
  algoliaSearchClientFactory,
} from '@asap-hub/algolia';
=======
import { algoliasearch, SearchClient } from '@asap-hub/algolia';
import { SquidexGraphql } from '@asap-hub/squidex';
import { algoliaAppId, algoliaIndexApiKey } from '../../config';
>>>>>>> update user index handler
import logger from '../../utils/logger';
import Users, { UserController } from '../../controllers/users';
import { UserEventType } from '../webhooks/webhook-user';
import { EventBridgeHandler } from '../../utils/types';
import { algoliaApiKey, algoliaAppId, algoliaIndex } from '../../config';
=======
import { EventBridgeEvent } from 'aws-lambda';
import { SquidexGraphql } from '@asap-hub/squidex';
import {
  AlgoliaSearchClient,
  algoliaSearchClientFactory,
} from '@asap-hub/algolia';
import { algoliaIndex } from '../../config';
import logger from '../../utils/logger';
import Users, { UserController } from '../../controllers/users';
import { UserEventType } from '../webhooks/webhook-user';
>>>>>>> update user index handler

export const indexUserHandler =
  (
    userController: UserController,
    algoliaClient: AlgoliaSearchClient,
<<<<<<< HEAD
  ): EventBridgeHandler<UserEventType, SquidexWebhookUserPayload> =>
  async (event) => {
=======
  ): ((
    event: EventBridgeEvent<UserEventType, SquidexWebhookUserPayload>,
  ) => Promise<void>) =>
  async (event: UserIndexEventBridgeEvent): Promise<void> => {
>>>>>>> update user index handler
    logger.debug(`Event ${event['detail-type']}`);

    try {
      const user = await userController.fetchById(event.detail.payload.id);
<<<<<<< HEAD

      logger.debug(`Fetched user ${user.id}`);

      await algoliaClient.save(user);

      logger.debug(`Saved user ${user.id}`);
    } catch (e) {
      if (e?.output?.statusCode === 404) {
        await algoliaClient.remove(event.detail.payload.id);
        return;
      }

      logger.error(e, 'Error saving user to Algolia');
=======

      logger.debug(`Fetched user ${user.id}`);

      await algoliaClient.save(user);

      logger.debug(`Saved user ${user.id}`);
    } catch (e) {
      if (e?.output?.statusCode === 404) {
        await algoliaClient.remove(event.detail.payload.id);
        return;
      }
>>>>>>> update user index handler
      throw e;
    }
  };

export type SquidexWebhookUserPayload = {
  type:
    | 'UsersPublished'
    | 'UsersCreated'
    | 'UsersUpdated'
    | 'UsersUnpublished'
    | 'UsersDeleted';
<<<<<<< HEAD
  timestamp: string;
=======
>>>>>>> update user index handler
  payload: {
    $type: 'EnrichedContentEvent';
    type: 'Published' | 'Updated' | 'Unpublished' | 'Deleted' | 'Created';
    id: string;
    created: string;
    lastModified: string;
    version: number;
    data: { [x: string]: { iv: unknown } | null };
  };
};

export const handler = indexUserHandler(
<<<<<<< HEAD
<<<<<<< HEAD
  new Users(new SquidexGraphql()),
  algoliaSearchClientFactory({ algoliaApiKey, algoliaAppId, algoliaIndex }),
);

export type UserIndexEventBridgeEvent = EventBridgeEvent<
  'UserPublished' | 'UserCreated' | 'UserUpdated' | 'UserDeleted',
  SquidexWebhookUserPayload
>;
=======
  new ResearchOutputs(new SquidexGraphql()),
  algoliasearch(algoliaAppId, algoliaIndexApiKey),
);
>>>>>>> add user index handler
=======
  new Users(new SquidexGraphql()),
  algoliaSearchClientFactory(algoliaIndex),
);

export type UserIndexEventBridgeEvent = EventBridgeEvent<
  'UserPublished' | 'UserCreated' | 'UserUpdated' | 'UserDeleted',
  SquidexWebhookUserPayload
>;
>>>>>>> update user index handler
