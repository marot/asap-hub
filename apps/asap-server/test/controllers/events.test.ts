import nock from 'nock';
import { Settings } from 'luxon';
import { config } from '@asap-hub/squidex';
import { identity } from '../helpers/squidex';
import Events, {
  buildGraphQLQueryFetchEvents,
  ResponseFetchEvents,
  buildGraphQLQueryFetchEvent,
  ResponseFetchEvent,
  buildGraphQLQueryFetchGroup,
} from '../../src/controllers/events';
import { ListEventResponse, EventStatus } from '@asap-hub/model';
import {
  fetchEventsResponse,
  listEventResponse,
  graphqlEvent,
  findEventResponse,
  eventResponse,
} from '../fixtures/events.fixtures';

describe('Event controller', () => {
  const events = new Events();

  beforeAll(() => {
    identity();
  });

  afterEach(() => {
    expect(nock.isDone()).toBe(true);
  });

  describe('Fetch method', () => {
    test('Should return an empty result when the client returns an empty array of data', async () => {
      nock(config.baseUrl)
        .post(`/api/content/${config.appName}/graphql`, (body) => body.query)
        .reply(200, {
          data: {
            queryEventsContentsWithTotal: {
              total: 0,
              items: [],
            },
          },
        });

      const result = await events.fetch({
        before: 'before',
      });

      const expectedResponse: ListEventResponse = {
        total: 0,
        items: [],
      };

      expect(result).toEqual(expectedResponse);
    });

    test('Should return a list of events', async () => {
      nock(config.baseUrl)
        .post(`/api/content/${config.appName}/graphql`, (body) => body.query)
        .reply(200, fetchEventsResponse);

      const result = await events.fetch({
        before: 'before',
      });

      expect(result).toEqual(listEventResponse);
    });

    describe('Date filters', () => {
      test('Should apply the "after" filter', async () => {
        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, {
            query: buildGraphQLQueryFetchEvents(
              'data/endDate/iv gt after-date',
            ),
          })
          .reply(200, fetchEventsResponse);

        await events.fetch({
          after: 'after-date',
        });
      });

      test('Should apply the "before" filter', async () => {
        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, {
            query: buildGraphQLQueryFetchEvents(
              'data/startDate/iv lt before-date',
            ),
          })
          .reply(200, fetchEventsResponse);

        await events.fetch({
          before: 'before-date',
        });
      });

      test('Should apply both the "after" and "before" filters', async () => {
        const expectedFilter =
          'data/endDate/iv gt after-date and data/startDate/iv lt before-date';

        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, {
            query: buildGraphQLQueryFetchEvents(expectedFilter),
          })
          .reply(200, fetchEventsResponse);

        await events.fetch({
          after: 'after-date',
          before: 'before-date',
        });
      });

      test('Should apply search query params', async () => {
        const expectedFilter =
          "(contains(data/title/iv, 'a') or contains(data/tags/iv, 'a')) and data/endDate/iv gt after-date";

        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, {
            query: buildGraphQLQueryFetchEvents(expectedFilter),
          })
          .reply(200, fetchEventsResponse);

        await events.fetch({
          after: 'after-date',
          search: 'a',
        });
      });
    });

    describe('Group filter', () => {
      const groupId = 'some-group-id';

      test('Should throw a Not Found error when the event is not found', async () => {
        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, /findGroupsContent/)
          .reply(200, {
            data: {
              findGroupsContent: null,
            },
          });

        await expect(
          events.fetch({
            after: 'after-date',
            groupId,
          }),
        ).rejects.toThrow('Not Found');
      });

      test('Should apply the "groupId" filter', async () => {
        const findGroupResponse = {
          data: {
            findGroupsContent: {
              flatData: {
                calendars: [
                  {
                    id: 'calendar-id-1',
                  },
                ],
              },
            },
          },
        };

        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, {
            query: buildGraphQLQueryFetchGroup(groupId),
          })
          .reply(200, findGroupResponse);

        const expectedFilter =
          "data/endDate/iv gt after-date and data/calendar/iv in ['calendar-id-1']";

        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, {
            query: buildGraphQLQueryFetchEvents(expectedFilter),
          })
          .reply(200, fetchEventsResponse);

        await events.fetch({
          after: 'after-date',
          groupId,
        });
      });
    });

    describe('Sorting', () => {
      const expectedFilter = 'data/endDate/iv gt after-date';

      test('Should apply the "orderBy" option using the startDate field and ascending order', async () => {
        const expectedOrder = 'data/startDate/iv asc';

        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, {
            query: buildGraphQLQueryFetchEvents(
              expectedFilter,
              undefined,
              undefined,
              expectedOrder,
            ),
          })
          .reply(200, fetchEventsResponse);

        await events.fetch({
          after: 'after-date',
          sortBy: 'startDate',
          sortOrder: 'asc',
        });
      });

      test('Should apply the "orderBy" option using the endDate field and descending order', async () => {
        const expectedOrder = 'data/endDate/iv desc';

        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, {
            query: buildGraphQLQueryFetchEvents(
              expectedFilter,
              undefined,
              undefined,
              expectedOrder,
            ),
          })
          .reply(200, fetchEventsResponse);

        await events.fetch({
          after: 'after-date',
          sortBy: 'endDate',
          sortOrder: 'desc',
        });
      });

      test('Should not apply any order if the parameters are not provided', async () => {
        const expectedOrder = '';

        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, {
            query: buildGraphQLQueryFetchEvents(
              expectedFilter,
              undefined,
              undefined,
              expectedOrder,
            ),
          })
          .reply(200, fetchEventsResponse);

        await events.fetch({
          after: 'after-date',
        });
      });
    });

    describe('Event link', () => {
      let fakeDate: jest.MockedFunction<typeof Date.now>;
      const realDate = Date.now.bind(Date);

      beforeAll(() => {
        fakeDate = jest.fn<number, []>();
        Settings.now = fakeDate;
      });

      afterAll(() => {
        Settings.now = realDate;
      });

      afterEach(() => {
        fakeDate.mockClear();
      });

      test('Should reveal the event link when the event starts in less than 24h from now', async () => {
        const event = graphqlEvent;
        event.flatData!.meetingLink = 'some-link';

        // mock todays date to year 06/06/2020
        fakeDate.mockReturnValue(
          new Date('2020-06-06T13:00:00.000Z').getTime(),
        );
        // change event start date to 06/06/2020, one hour from the above
        event.flatData!.startDate = '2020-06-06T14:00:00Z';

        const fetchEventsResponse: { data: ResponseFetchEvents } = {
          data: {
            queryEventsContentsWithTotal: {
              total: 2,
              items: [event],
            },
          },
        };

        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, (body) => body.query)
          .reply(200, fetchEventsResponse);

        const { items } = await events.fetch({
          before: 'before',
        });

        expect(items[0].meetingLink).toBe('some-link');
      });

      test('Should reveal the event link when the event start date is in the past', async () => {
        const event = graphqlEvent;
        event.flatData!.meetingLink = 'some-link';

        // mock todays date to year 2021
        fakeDate.mockReturnValueOnce(
          new Date('2021-06-06T13:00:00.000Z').getTime(),
        );
        // change event start date to 2020
        event.flatData!.startDate = '2020-06-06T14:00:00Z';

        const fetchEventsResponse: { data: ResponseFetchEvents } = {
          data: {
            queryEventsContentsWithTotal: {
              total: 2,
              items: [event],
            },
          },
        };

        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, (body) => body.query)
          .reply(200, fetchEventsResponse);

        const { items } = await events.fetch({
          before: 'before',
        });

        expect(items[0].meetingLink).toBe('some-link');
      });

      test('Should remove the event link when the event starts in more than 24h from now', async () => {
        const event = graphqlEvent;
        event.flatData!.meetingLink = 'some-link';

        // mock todays date to year 2020
        fakeDate.mockReturnValueOnce(
          new Date('2020-06-06T13:00:00.000Z').getTime(),
        );
        // change event start date to year 2021
        event.flatData!.startDate = '2021-06-06T13:00:00Z';

        const fetchEventsResponse: { data: ResponseFetchEvents } = {
          data: {
            queryEventsContentsWithTotal: {
              total: 2,
              items: [event],
            },
          },
        };

        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, (body) => body.query)
          .reply(200, fetchEventsResponse);

        const { items } = await events.fetch({
          before: 'before',
        });

        expect(items[0].meetingLink).toBeUndefined();
      });
    });
  });

  describe('Fetch by id method', () => {
    test('Should throw a Not Found error when the event is not found', async () => {
      const eventId = 'not-found';

      nock(config.baseUrl)
        .post(`/api/content/${config.appName}/graphql`, (body) => body.query)
        .reply(200, {
          data: {
            findEventsContent: null,
          },
        });

      await expect(events.fetchById(eventId)).rejects.toThrow('Not Found');
    });

    test('Should return the event', async () => {
      const eventId = 'group-id-1';

      nock(config.baseUrl)
        .post(`/api/content/${config.appName}/graphql`, {
          query: buildGraphQLQueryFetchEvent(eventId),
        })
        .reply(200, findEventResponse);

      const result = await events.fetchById(eventId);
      expect(result).toEqual(eventResponse);
    });

    describe('Event link', () => {
      let fakeDate: jest.MockedFunction<typeof Date.now>;
      const realDate = Date.now.bind(Date);

      beforeAll(() => {
        fakeDate = jest.fn<number, []>();
        Settings.now = fakeDate;
      });

      afterAll(() => {
        Settings.now = realDate;
      });

      afterEach(() => {
        fakeDate.mockClear();
      });

      test('Should reveal the event link when the event starts in less than 24h from now', async () => {
        const event = graphqlEvent;
        event.flatData!.meetingLink = 'some-link';

        // mock todays date to year 06/06/2020
        fakeDate.mockReturnValue(
          new Date('2020-06-06T13:00:00.000Z').getTime(),
        );
        // change event start date to 06/06/2020, one hour from the above
        event.flatData!.startDate = '2020-06-06T14:00:00Z';

        const fetchEventResponse: { data: ResponseFetchEvent } = {
          data: {
            findEventsContent: event,
          },
        };

        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, (body) => body.query)
          .reply(200, fetchEventResponse);

        const response = await events.fetchById(event.id);

        expect(response.meetingLink).toBe('some-link');
      });

      test('Should reveal the event link when the event start date is in the past', async () => {
        const event = graphqlEvent;
        event.flatData!.meetingLink = 'some-link';

        // mock todays date to year 2021
        fakeDate.mockReturnValueOnce(
          new Date('2021-06-06T13:00:00.000Z').getTime(),
        );
        // change event start date to 2020
        event.flatData!.startDate = '2020-06-06T14:00:00Z';

        const fetchEventResponse: { data: ResponseFetchEvent } = {
          data: {
            findEventsContent: event,
          },
        };

        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, (body) => body.query)
          .reply(200, fetchEventResponse);

        const response = await events.fetchById(event.id);

        expect(response.meetingLink).toBe('some-link');
      });

      test('Should remove the event link when the event starts in more than 24h from now', async () => {
        const event = graphqlEvent;
        event.flatData!.meetingLink = 'some-link';

        // mock todays date to year 2020
        fakeDate.mockReturnValueOnce(
          new Date('2020-06-06T13:00:00.000Z').getTime(),
        );
        // change event start date to year 2021
        event.flatData!.startDate = '2021-06-06T13:00:00Z';

        const fetchEventResponse: { data: ResponseFetchEvent } = {
          data: {
            findEventsContent: event,
          },
        };

        nock(config.baseUrl)
          .post(`/api/content/${config.appName}/graphql`, (body) => body.query)
          .reply(200, fetchEventResponse);

        const response = await events.fetchById(event.id);
        expect(response.meetingLink).toBeUndefined();
      });
    });
  });

  describe('Upsert method', () => {
    const eventId = 'event-id';
    const calendarId = 'calendar-id';
    const eventData = {
      title: 'Event Tittle',
      description: 'This event will be good',
      startDate: '2021-02-23T19:32:00Z',
      startDateTimeZone: 'Europe/Lisbon',
      endDate: '2021-02-23T19:32:00Z',
      endDateTimeZone: 'Europe/Lisbon',
      calendar: [calendarId],
      eventLink: 'event-link',
      status: 'confirmed' as EventStatus,
      tags: [],
      meetingLink: 'https://meetings.com',
    };

    // TODO: create responses on squidex don't contain `iv`
    const eventResponse: Record<
      string,
      string | Record<string, string | string[]>
    > = {
      id: eventId,
      created: '2021-02-23T19:32:00Z',
      createdBy: 'jt',
      lastModified: '2021-02-23T19:32:00Z',
      lastModifiedBy: 'jt',
      data: eventData,
    };

    test('Should create or update the event', async () => {
      nock(config.baseUrl)
        .post(`/api/content/${config.appName}/events/${eventId}?publish=true`, {
          title: { iv: 'Event Tittle' },
          description: { iv: 'This event will be good' },
          startDate: { iv: '2021-02-23T19:32:00Z' },
          startDateTimeZone: { iv: 'Europe/Lisbon' },
          endDate: { iv: '2021-02-23T19:32:00Z' },
          endDateTimeZone: { iv: 'Europe/Lisbon' },
          calendar: { iv: [calendarId] },
          eventLink: { iv: 'event-link' },
          status: { iv: 'confirmed' },
          tags: { iv: [] },
          meetingLink: { iv: 'https://meetings.com' },
        })
        .reply(200, eventResponse);

      await events.upsert(eventId, eventData);
    });
  });
});
