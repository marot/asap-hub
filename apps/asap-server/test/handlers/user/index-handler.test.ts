import Boom from '@hapi/boom';
<<<<<<< HEAD
import { indexUserHandler } from '../../../src/handlers/user/index-handler';
import { getUserEvent, getUserResponse } from '../../fixtures/users.fixtures';
=======
import { EventBridgeEvent } from 'aws-lambda';
import { indexUserHandler } from '../../../src/handlers/user/index-handler';
<<<<<<< HEAD
import { getUserResponse } from '../../fixtures/users.fixtures';
>>>>>>> refactor the client
=======
import { SquidexWebhookUserPayload } from '../../../src/handlers/user/invite-handler';
import { UserEventType } from '../../../src/handlers/webhooks/webhook-user';
import { getUserEvent, getUserResponse } from '../../fixtures/users.fixtures';
>>>>>>> update user index handler
import { algoliaSearchClientMock } from '../../mocks/algolia-client.mock';
import { userControllerMock } from '../../mocks/user-controller.mock';

describe('User index handler', () => {
  const indexHandler = indexUserHandler(
    userControllerMock,
    algoliaSearchClientMock,
  );

  afterEach(() => jest.clearAllMocks());

  test('Should fetch the user and create a record in Algolia when the user is created', async () => {
<<<<<<< HEAD
    const event = createEvent();
    const userResponse = getUserResponse();
    userControllerMock.fetchById.mockResolvedValueOnce(userResponse);

    await indexHandler(event);
    expect(userControllerMock.fetchById).toHaveBeenCalledWith(
      event.detail.payload.id,
    );
    expect(algoliaSearchClientMock.save).toHaveBeenCalledWith(userResponse);
  });

  test('Should fetch the user and create a record in Algolia when user is updated', async () => {
    const userResponse = getUserResponse();
    userControllerMock.fetchById.mockResolvedValueOnce(userResponse);

    await indexHandler(updateEvent());
=======
    const userResponse = getUserResponse();
    userControllerMock.fetchById.mockResolvedValueOnce(userResponse);

    await indexHandler(createEvent('user-1234'));
    expect(algoliaSearchClientMock.save).toHaveBeenCalledWith(userResponse);
  });

  test('Should fetch the user and create a record in Algolia when user is updated', async () => {
    const userResponse = getUserResponse();
    userControllerMock.fetchById.mockResolvedValueOnce(userResponse);

    await indexHandler(updateEvent('user-1234'));
>>>>>>> refactor the client

    expect(algoliaSearchClientMock.save).toHaveBeenCalledWith(userResponse);
  });

<<<<<<< HEAD
<<<<<<< HEAD
  test('Should fetch the user and remove the record in Algolia when user is unpublished', async () => {
    const event = unpublishedEvent();

    userControllerMock.fetchById.mockRejectedValue(Boom.notFound());

    await indexHandler(event);

    expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
=======
  test('Should fetch the research-output and remove the record in Algolia when research-output is unpublished', async () => {
    const event = unpublishedEvent('ro-1234');
=======
  test('Should fetch the user and remove the record in Algolia when user is unpublished', async () => {
    const event = unpublishedEvent('user-1234');
>>>>>>> update user index handler

    userControllerMock.fetchById.mockRejectedValue(Boom.notFound());

    await indexHandler(event);

<<<<<<< HEAD
    expect(algoliaIndexMock.deleteObject).toHaveBeenCalledWith(
>>>>>>> refactor the client
=======
    expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
>>>>>>> update user index handler
      event.detail.payload.id,
    );
  });

<<<<<<< HEAD
<<<<<<< HEAD
  test('Should fetch the user and remove the record in Algolia when user is deleted', async () => {
    const event = deleteEvent();

    userControllerMock.fetchById.mockRejectedValue(Boom.notFound());

    await indexHandler(event);

    expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
=======
  test('Should fetch the research-output and remove the record in Algolia when research-output is deleted', async () => {
    const event = deleteEvent('ro-1234');
=======
  test('Should fetch the user and remove the record in Algolia when user is deleted', async () => {
    const event = deleteEvent('user-1234');
>>>>>>> update user index handler

    userControllerMock.fetchById.mockRejectedValue(Boom.notFound());

    await indexHandler(event);

<<<<<<< HEAD
    expect(algoliaIndexMock.deleteObject).toHaveBeenCalledWith(
>>>>>>> refactor the client
=======
    expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
>>>>>>> update user index handler
      event.detail.payload.id,
    );
  });

<<<<<<< HEAD
<<<<<<< HEAD
  test('Should throw an error and do not trigger algolia when the user request fails with another error code', async () => {
    userControllerMock.fetchById.mockRejectedValue(Boom.badData());

    await expect(indexHandler(createEvent())).rejects.toThrow(Boom.badData());
    expect(algoliaSearchClientMock.remove).not.toHaveBeenCalled();
=======
  test('Should throw an error and do not trigger algolia when the research-output request fails with another error code', async () => {
    researchOutputControllerMock.fetchById.mockRejectedValue(Boom.badData());
=======
  test('Should throw an error and do not trigger algolia when the user request fails with another error code', async () => {
    userControllerMock.fetchById.mockRejectedValue(Boom.badData());
>>>>>>> update user index handler

    await expect(indexHandler(createEvent('user-1234'))).rejects.toThrow(
      Boom.badData(),
    );
<<<<<<< HEAD
    expect(algoliaIndexMock.deleteObject).not.toHaveBeenCalled();
>>>>>>> refactor the client
=======
    expect(algoliaSearchClientMock.remove).not.toHaveBeenCalled();
>>>>>>> update user index handler
  });

  test('Should throw the algolia error when saving the record fails', async () => {
    const algoliaError = new Error('ERROR');

<<<<<<< HEAD
<<<<<<< HEAD
    userControllerMock.fetchById.mockResolvedValueOnce(getUserResponse());
    algoliaSearchClientMock.save.mockRejectedValueOnce(algoliaError);

    await expect(indexHandler(updateEvent())).rejects.toThrow(algoliaError);
=======
    researchOutputControllerMock.fetchById.mockResolvedValueOnce(
      getResearchOutputAlgoliaResponse(),
    );
    algoliaIndexMock.saveObject.mockRejectedValueOnce(algoliaError);
=======
    userControllerMock.fetchById.mockResolvedValueOnce(getUserResponse());
    algoliaSearchClientMock.save.mockRejectedValueOnce(algoliaError);
>>>>>>> update user index handler

    await expect(indexHandler(updateEvent('user-1234'))).rejects.toThrow(
      algoliaError,
    );
>>>>>>> refactor the client
  });

  test('Should throw the algolia error when deleting the record fails', async () => {
    const algoliaError = new Error('ERROR');

<<<<<<< HEAD
<<<<<<< HEAD
    userControllerMock.fetchById.mockRejectedValue(Boom.notFound());

    algoliaSearchClientMock.remove.mockRejectedValueOnce(algoliaError);

    await expect(indexHandler(deleteEvent())).rejects.toThrow(algoliaError);
=======
    researchOutputControllerMock.fetchById.mockRejectedValue(Boom.notFound());
=======
    userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
>>>>>>> update user index handler

    algoliaSearchClientMock.remove.mockRejectedValueOnce(algoliaError);

    await expect(indexHandler(deleteEvent('user-1234'))).rejects.toThrow(
      algoliaError,
    );
>>>>>>> refactor the client
  });

  describe('Should process the events, handle race conditions and not rely on the order of the events', () => {
    test('receives the events created and updated in correct order', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> update user index handler
      const userId = 'user-1234';
      const userResponse = {
        ...getUserResponse(),
        id: userId,
<<<<<<< HEAD
      };

      userControllerMock.fetchById.mockResolvedValue({
        ...userResponse,
      });

      await indexHandler(createEvent(userId));
      await indexHandler(updateEvent(userId));

      expect(algoliaSearchClientMock.remove).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.save).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.save).toHaveBeenCalledWith(userResponse);
    });

    test('receives the events created and updated in reverse order', async () => {
      const userId = 'user-1234';
      const userResponse = {
        ...getUserResponse(),
        id: userId,
      };

      userControllerMock.fetchById.mockResolvedValue(userResponse);

      await indexHandler(updateEvent(userId));
      await indexHandler(createEvent(userId));

      expect(algoliaSearchClientMock.remove).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.save).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.save).toHaveBeenCalledWith(userResponse);
    });

    test('receives the events created and unpublished in correct order', async () => {
      const userId = 'user-1234';
      const createEv = createEvent(userId);
      const unpublishedEv = unpublishedEvent(userId);
      const algoliaError = new Error('ERROR');

      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
=======
      const roID = 'ro-1234';
      const researchOutputResponse = {
        ...getResearchOutputAlgoliaResponse(),
        id: roID,
=======
>>>>>>> update user index handler
      };

      userControllerMock.fetchById.mockResolvedValue({
        ...userResponse,
      });

      await indexHandler(createEvent(userId));
      await indexHandler(updateEvent(userId));

      expect(algoliaSearchClientMock.remove).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.save).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.save).toHaveBeenCalledWith(userResponse);
    });

    test('receives the events created and updated in reverse order', async () => {
      const userId = 'user-1234';
      const userResponse = {
        ...getUserResponse(),
        id: userId,
      };

      userControllerMock.fetchById.mockResolvedValue(userResponse);

      await indexHandler(updateEvent(userId));
      await indexHandler(createEvent(userId));

      expect(algoliaSearchClientMock.remove).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.save).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.save).toHaveBeenCalledWith(userResponse);
    });

    test('receives the events created and unpublished in correct order', async () => {
      const userId = 'user-1234';
      const createEv = createEvent(userId);
      const unpublishedEv = unpublishedEvent(userId);
      const algoliaError = new Error('ERROR');

<<<<<<< HEAD
      researchOutputControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaIndexMock.deleteObject.mockResolvedValueOnce({ taskID: 1 });
      algoliaIndexMock.deleteObject.mockRejectedValue(algoliaError);
>>>>>>> refactor the client
=======
      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
>>>>>>> update user index handler

      await indexHandler(createEv);
      await expect(indexHandler(unpublishedEv)).rejects.toEqual(algoliaError);

<<<<<<< HEAD
<<<<<<< HEAD
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
=======
      expect(algoliaIndexMock.saveObject).not.toHaveBeenCalled();
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledTimes(2);
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledWith(
>>>>>>> refactor the client
=======
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
>>>>>>> update user index handler
        unpublishedEv.detail.payload.id,
      );
    });

    test('receives the events created and unpublished in reverse order', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      const userId = 'user-1234';
      const createEv = createEvent(userId);
      const unpublishedEv = unpublishedEvent(userId);
      const algoliaError = new Error('ERROR');

      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
=======
      const roID = 'ro-1234';
      const createEv = createEvent(roID);
      const unpublishedEv = unpublishedEvent(roID);
      const algoliaError = new Error('ERROR');

      researchOutputControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaIndexMock.deleteObject.mockResolvedValueOnce({ taskID: 1 });
      algoliaIndexMock.deleteObject.mockRejectedValue(algoliaError);
>>>>>>> refactor the client
=======
      const userId = 'user-1234';
      const createEv = createEvent(userId);
      const unpublishedEv = unpublishedEvent(userId);
      const algoliaError = new Error('ERROR');

      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
>>>>>>> update user index handler

      await indexHandler(unpublishedEv);
      await expect(indexHandler(createEv)).rejects.toEqual(algoliaError);

<<<<<<< HEAD
<<<<<<< HEAD
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
=======
      expect(algoliaIndexMock.saveObject).not.toHaveBeenCalled();
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledTimes(2);
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledWith(
>>>>>>> refactor the client
=======
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
>>>>>>> update user index handler
        unpublishedEv.detail.payload.id,
      );
    });

    test('receives the events created and deleted in correct order', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      const userId = 'user-1234';
      const createEv = createEvent(userId);
      const deleteEv = deleteEvent(userId);
      const algoliaError = new Error('ERROR');

      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
=======
      const roID = 'ro-1234';
      const createEv = createEvent(roID);
      const deleteEv = deleteEvent(roID);
      const algoliaError = new Error('ERROR');

      researchOutputControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaIndexMock.deleteObject.mockResolvedValueOnce({ taskID: 1 });
      algoliaIndexMock.deleteObject.mockRejectedValue(algoliaError);
>>>>>>> refactor the client
=======
      const userId = 'user-1234';
      const createEv = createEvent(userId);
      const deleteEv = deleteEvent(userId);
      const algoliaError = new Error('ERROR');

      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
>>>>>>> update user index handler

      await indexHandler(createEv);
      await expect(indexHandler(deleteEv)).rejects.toEqual(algoliaError);

<<<<<<< HEAD
<<<<<<< HEAD
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
=======
      expect(algoliaIndexMock.saveObject).not.toHaveBeenCalled();
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledTimes(2);
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledWith(
>>>>>>> refactor the client
=======
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
>>>>>>> update user index handler
        deleteEv.detail.payload.id,
      );
    });

    test('receives the events created and deleted in reverse order', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      const userId = 'user-1234';
      const createEv = createEvent(userId);
      const deleteEv = deleteEvent(userId);
      const algoliaError = new Error('ERROR');

      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
=======
      const roID = 'ro-1234';
      const createEv = createEvent(roID);
      const deleteEv = deleteEvent(roID);
      const algoliaError = new Error('ERROR');

      researchOutputControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaIndexMock.deleteObject.mockResolvedValueOnce({ taskID: 1 });
      algoliaIndexMock.deleteObject.mockRejectedValue(algoliaError);
>>>>>>> refactor the client
=======
      const userId = 'user-1234';
      const createEv = createEvent(userId);
      const deleteEv = deleteEvent(userId);
      const algoliaError = new Error('ERROR');

      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
>>>>>>> update user index handler

      await indexHandler(deleteEv);
      await expect(indexHandler(createEv)).rejects.toEqual(algoliaError);

<<<<<<< HEAD
<<<<<<< HEAD
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
=======
      expect(algoliaIndexMock.saveObject).not.toHaveBeenCalled();
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledTimes(2);
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledWith(
>>>>>>> refactor the client
=======
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
>>>>>>> update user index handler
        deleteEv.detail.payload.id,
      );
    });

    test('receives the events updated and deleted in correct order', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      const userId = 'user-1234';
      const updateEv = updateEvent(userId);
      const deleteEv = deleteEvent(userId);
      const algoliaError = new Error('ERROR');

      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
=======
      const roID = 'ro-1234';
      const updateEv = updateEvent(roID);
      const deleteEv = deleteEvent(roID);
      const algoliaError = new Error('ERROR');

      researchOutputControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaIndexMock.deleteObject.mockResolvedValueOnce({ taskID: 1 });
      algoliaIndexMock.deleteObject.mockRejectedValue(algoliaError);
>>>>>>> refactor the client
=======
      const userId = 'user-1234';
      const updateEv = updateEvent(userId);
      const deleteEv = deleteEvent(userId);
      const algoliaError = new Error('ERROR');

      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
>>>>>>> update user index handler

      await indexHandler(updateEv);
      await expect(indexHandler(deleteEv)).rejects.toEqual(algoliaError);

<<<<<<< HEAD
<<<<<<< HEAD
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
=======
      expect(algoliaIndexMock.saveObject).not.toHaveBeenCalled();
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledTimes(2);
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledWith(
>>>>>>> refactor the client
=======
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
>>>>>>> update user index handler
        deleteEv.detail.payload.id,
      );
    });

    test('receives the events updated and deleted in reverse order', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      const userId = 'user-1234';
      const updateEv = updateEvent(userId);
      const deleteEv = deleteEvent(userId);
      const algoliaError = new Error('ERROR');

      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
=======
      const roID = 'ro-1234';
      const updateEv = updateEvent(roID);
      const deleteEv = deleteEvent(roID);
      const algoliaError = new Error('ERROR');

      researchOutputControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaIndexMock.deleteObject.mockResolvedValueOnce({ taskID: 1 });
      algoliaIndexMock.deleteObject.mockRejectedValue(algoliaError);
>>>>>>> refactor the client
=======
      const userId = 'user-1234';
      const updateEv = updateEvent(userId);
      const deleteEv = deleteEvent(userId);
      const algoliaError = new Error('ERROR');

      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
>>>>>>> update user index handler

      await indexHandler(deleteEv);
      await expect(indexHandler(updateEv)).rejects.toEqual(algoliaError);

<<<<<<< HEAD
<<<<<<< HEAD
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
=======
      expect(algoliaIndexMock.saveObject).not.toHaveBeenCalled();
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledTimes(2);
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledWith(
>>>>>>> refactor the client
=======
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
>>>>>>> update user index handler
        deleteEv.detail.payload.id,
      );
    });
    test('receives the events updated and unpublished in correct order', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      const userId = 'user-1234';
      const updateEv = updateEvent(userId);
      const unpublishedEv = unpublishedEvent(userId);
      const algoliaError = new Error('ERROR');

      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
=======
      const roID = 'ro-1234';
      const updateEv = updateEvent(roID);
      const unpublishedEv = unpublishedEvent(roID);
      const algoliaError = new Error('ERROR');

      researchOutputControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaIndexMock.deleteObject.mockResolvedValueOnce({ taskID: 1 });
      algoliaIndexMock.deleteObject.mockRejectedValue(algoliaError);
>>>>>>> refactor the client
=======
      const userId = 'user-1234';
      const updateEv = updateEvent(userId);
      const unpublishedEv = unpublishedEvent(userId);
      const algoliaError = new Error('ERROR');

      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
>>>>>>> update user index handler

      await indexHandler(updateEv);
      await expect(indexHandler(unpublishedEv)).rejects.toEqual(algoliaError);

<<<<<<< HEAD
<<<<<<< HEAD
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
=======
      expect(algoliaIndexMock.saveObject).not.toHaveBeenCalled();
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledTimes(2);
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledWith(
>>>>>>> refactor the client
=======
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
>>>>>>> update user index handler
        unpublishedEv.detail.payload.id,
      );
    });

    test('receives the events updated and unpublished in reverse order', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      const userId = 'user-1234';
      const updateEv = updateEvent(userId);
      const unpublishedEv = unpublishedEvent(userId);
      const algoliaError = new Error('ERROR');

      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
=======
      const roID = 'ro-1234';
      const updateEv = updateEvent(roID);
      const unpublishedEv = unpublishedEvent(roID);
      const algoliaError = new Error('ERROR');

      researchOutputControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaIndexMock.deleteObject.mockResolvedValueOnce({ taskID: 1 });
      algoliaIndexMock.deleteObject.mockRejectedValue(algoliaError);
>>>>>>> refactor the client
=======
      const userId = 'user-1234';
      const updateEv = updateEvent(userId);
      const unpublishedEv = unpublishedEvent(userId);
      const algoliaError = new Error('ERROR');

      userControllerMock.fetchById.mockRejectedValue(Boom.notFound());
      algoliaSearchClientMock.remove.mockResolvedValueOnce(undefined);
      algoliaSearchClientMock.remove.mockRejectedValue(algoliaError);
>>>>>>> update user index handler

      await indexHandler(unpublishedEv);
      await expect(indexHandler(updateEv)).rejects.toEqual(algoliaError);

<<<<<<< HEAD
<<<<<<< HEAD
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
=======
      expect(algoliaIndexMock.saveObject).not.toHaveBeenCalled();
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledTimes(2);
      expect(algoliaIndexMock.deleteObject).toHaveBeenCalledWith(
>>>>>>> refactor the client
=======
      expect(algoliaSearchClientMock.save).not.toHaveBeenCalled();
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledTimes(2);
      expect(algoliaSearchClientMock.remove).toHaveBeenCalledWith(
>>>>>>> update user index handler
        unpublishedEv.detail.payload.id,
      );
    });
  });
});

<<<<<<< HEAD
const unpublishedEvent = (id: string = 'user-1234') =>
  getUserEvent(id, 'UsersUnpublished', 'UserDeleted');

const deleteEvent = (id: string = 'user-1234') =>
  getUserEvent(id, 'UsersDeleted', 'UserDeleted');

const createEvent = (id: string = 'user-1234') =>
  getUserEvent(id, 'UsersPublished', 'UserPublished');

const updateEvent = (id: string = 'user-1234') =>
  getUserEvent(id, 'UsersUpdated', 'UserUpdated');
=======
const unpublishedEvent = (id: string) =>
  getUserEvent(id, 'UsersUnpublished', 'UserDeleted') as EventBridgeEvent<
    UserEventType,
    SquidexWebhookUserPayload
  >;

const deleteEvent = (id: string) =>
  getUserEvent(id, 'UsersDeleted', 'UserDeleted') as EventBridgeEvent<
    UserEventType,
    SquidexWebhookUserPayload
  >;

const createEvent = (id: string) =>
  getUserEvent(id, 'UsersPublished', 'UserPublished') as EventBridgeEvent<
    UserEventType,
    SquidexWebhookUserPayload
  >;

const updateEvent = (id: string) =>
  getUserEvent(id, 'UsersUpdated', 'UserUpdated') as EventBridgeEvent<
    UserEventType,
    SquidexWebhookUserPayload
  >;
>>>>>>> refactor the client
