import Boom from '@hapi/boom';
import supertest from 'supertest';
import { appFactory } from '../../src/app';
import { authHandlerMock } from '../mocks/auth-handler.mock';
import { eventControllerMock } from '../mocks/event-controller.mock';
import { ListEventResponse, EventResponse } from '@asap-hub/model';
import {
  FetchEventsOptions,
  EventBaseResponse,
} from '../../src/controllers/events';

describe('/events/ routes', () => {
  const app = appFactory({
    authHandler: authHandlerMock,
    eventController: eventControllerMock,
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /events', () => {
    const query = { after: '2021-02-08T14:13:37.138Z' };

    test('Should return 200 when no events exist', async () => {
      eventControllerMock.fetch.mockResolvedValueOnce({
        total: 0,
        items: [],
      });
      const response = await supertest(app).get('/events').query(query);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        total: 0,

        items: [],
      });
    });

    test('Should return results correctly', async () => {
      const listEventResponse: ListEventResponse = {
        total: 1,
        items: [
          {
            id: 'event-id-1',
            title: 'example event title',
            startDate: '2020-12-11T14:33:50Z',
            endDate: '2020-12-11T14:33:50Z',
            status: 'Confirmed',
            tags: [],
            description: 'Description example event title',
            calendar: {
              id: 'calendar-id-1',
              name: 'Example calendar',
              color: '#333333',
            },
            groups: [],
            meetingLink: 'https://sample.event.link/123456',
            lastModifiedDate: '2020-12-11T14:33:50Z',
          },
        ],
      };

      eventControllerMock.fetch.mockResolvedValueOnce(listEventResponse);
      const response = await supertest(app).get('/events').query(query);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(listEventResponse);
    });

    test('Should call the controller method with the correct parameters', async () => {
      eventControllerMock.fetch.mockResolvedValueOnce({
        items: [],
        total: 0,
      });

      await supertest(app).get('/events').query({
        take: 15,
        skip: 5,
        before: '2021-02-08T14:29:59.895Z',
        after: '2021-02-08T14:13:37.138Z',
      });

      const expectedParams: FetchEventsOptions = {
        take: 15,
        skip: 5,
        before: '2021-02-08T14:29:59.895Z',
        after: '2021-02-08T14:13:37.138Z',
      };

      expect(eventControllerMock.fetch).toBeCalledWith(expectedParams);
    });

    describe('Parameter validation', () => {
      test('Should return a validation error when both before and after are missing', async () => {
        const response = await supertest(app).get('/events').query({
          take: '10',
        });
        expect(response.status).toBe(400);
      });

      test('Should return a validation error when before parameter is present but empty', async () => {
        const response = await supertest(app).get('/events').query({
          before: '',
        });
        expect(response.status).toBe(400);
      });

      test('Should return a validation error when before parameter is invalid', async () => {
        const response = await supertest(app).get('/events').query({
          before: 'not-a-date',
        });
        expect(response.status).toBe(400);
      });

      test('Should return a validation error when after parameter is present but empty', async () => {
        const response = await supertest(app).get('/events').query({
          after: '',
        });
        expect(response.status).toBe(400);
      });

      test('Should return a validation error when after parameter is invalid', async () => {
        const response = await supertest(app).get('/events').query({
          after: 'not-a-date',
        });
        expect(response.status).toBe(400);
      });

      test('Should return a validation error when skip parameter is invalid', async () => {
        const response = await supertest(app).get('/events').query({
          before: '2021-02-08T14:13:37.138Z',
          skip: 'invalid-parameter',
        });
        expect(response.status).toBe(400);
      });

      test('Should return a validation error when take parameter is invalid', async () => {
        const response = await supertest(app).get('/events').query({
          before: '2021-02-08T14:13:37.138Z',
          take: 'invalid-parameter',
        });
        expect(response.status).toBe(400);
      });
    });
  });

  describe('GET /events/{event_id}', () => {
    test('Should return 404 when no event exist', async () => {
      eventControllerMock.fetchById.mockRejectedValueOnce(Boom.notFound());

      const response = await supertest(app).get('/events/123');

      expect(response.status).toBe(404);
    });

    test('Should return the results correctly', async () => {
      const eventBaseResponse: EventBaseResponse = {
        id: 'event-id-1',
        title: 'example event title',
        startDate: '2020-12-11T14:33:50Z',
        endDate: '2020-12-11T14:33:50Z',
        description: 'Description of event title',
        calendar: {
          id: 'calendar-id-1',
          name: 'Example calendar',
          color: '#333333',
        },
        status: 'Confirmed',
        tags: [],
        meetingLink: 'https://sample.event.link/123456',
        lastModifiedDate: '2020-12-11T14:33:50Z',
      };

      eventControllerMock.fetchById.mockResolvedValueOnce(eventBaseResponse);

      const response = await supertest(app).get('/events/123');

      const expectedResponse: EventResponse = {
        ...eventBaseResponse,
        groups: [],
      };

      expect(response.body).toEqual(expectedResponse);
    });
  });
});
