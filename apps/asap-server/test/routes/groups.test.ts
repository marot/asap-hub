import supertest from 'supertest';
import Boom from '@hapi/boom';
import { appFactory } from '../../src/app';
import { FetchOptions } from '../../src/utils/types';
import * as fixtures from '../fixtures/groups.fixtures';
import { authHandlerMock } from '../mocks/auth-handler.mock';
import { groupControllerMock } from '../mocks/group-controller.mock';

describe('/groups/ route', () => {
  const app = appFactory({
    groupController: groupControllerMock,
    authHandler: authHandlerMock,
  });

  afterEach(() => {
    groupControllerMock.fetch.mockReset();
  });

  describe('GET /groups', () => {
    test('Should return 200 when no grups exist', async () => {
      groupControllerMock.fetch.mockResolvedValueOnce({
        items: [],
        total: 0,
      });

      const response = await supertest(app).get('/groups/');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        total: 0,
        items: [],
      });
    });

    test('Should return the results correctly', async () => {
      groupControllerMock.fetch.mockResolvedValueOnce(
        fixtures.queryGroupsExpectation,
      );

      const response = await supertest(app).get('/groups/');

      expect(response.body).toEqual(fixtures.queryGroupsExpectation);
    });

    test('Should call the controller with the right parameters', async () => {
      groupControllerMock.fetch.mockResolvedValueOnce({
        items: [],
        total: 0,
      });

      await supertest(app).get('/groups/').query({
        take: 15,
        skip: 5,
        search: 'something',
      });

      const expectedParams: FetchOptions = {
        take: 15,
        skip: 5,
        search: 'something',
      };

      expect(groupControllerMock.fetch).toBeCalledWith(expectedParams);
    });

    describe('Parameter validation', () => {
      test('Should return a validation error when the arguments are not valid', async () => {
        const response = await supertest(app).get('/groups/').query({
          take: 'invalid param',
        });

        expect(response.status).toBe(400);
      });
    });
  });

  describe('GET /groups/{groupId}', () => {
    test('Should return 404 when no group exist', async () => {
      groupControllerMock.fetchById.mockRejectedValueOnce(Boom.notFound());

      const response = await supertest(app).get('/groups/123');

      expect(response.status).toBe(404);
    });

    test('Should return the results correctly', async () => {
      groupControllerMock.fetchById.mockResolvedValueOnce(
        fixtures.findGroupExpectation,
      );

      const response = await supertest(app).get('/groups/123');

      expect(response.body).toEqual(fixtures.findGroupExpectation);
    });
  });
});