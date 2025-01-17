import nock from 'nock';
import { APIGatewayProxyResult } from 'aws-lambda';
import { config, RestUser } from '@asap-hub/squidex';

import { handler } from '../../../src/handlers/webhooks/webhook-connect-by-code';
import { getApiGatewayEvent } from '../../helpers/events';
import { identity } from '../../helpers/squidex';
import { auth0SharedSecret as secret } from '../../../src/config';

const user: RestUser = {
  id: 'userId',
  lastModified: '2020-09-25T11:06:27.164Z',
  version: 42,
  created: '2020-09-24T11:06:27.164Z',
  data: {
    role: {
      iv: 'Grantee',
    },
    lastModifiedDate: { iv: '2020-09-25T11:06:27.164Z' },
    email: { iv: 'me@example.com' },
    firstName: { iv: 'First' },
    lastName: { iv: 'Last' },
    jobTitle: { iv: 'Title' },
    institution: { iv: 'Institution' },
    connections: { iv: [] },
    biography: { iv: 'Biography' },
    avatar: { iv: [] },
    expertiseAndResourceTags: { iv: [] },
    questions: { iv: [] },
    teams: { iv: [] },
    onboarded: {
      iv: true,
    },
    labs: { iv: [] },
  },
};

describe('POST /webhook/users/connections - validations', () => {
  test('returns 400 when code is not defined', async () => {
    const res = (await handler(
      getApiGatewayEvent({
        body: JSON.stringify({
          userId: 'userId',
        }),
        headers: {
          Authorization: `Basic ${secret}`,
        },
      }),
    )) as APIGatewayProxyResult;

    expect(res.statusCode).toStrictEqual(400);
  });

  test('returns 400 when userId is not defined', async () => {
    const res = (await handler(
      getApiGatewayEvent({
        body: JSON.stringify({
          code: 'asap|token',
        }),
        headers: {
          Authorization: `Basic ${secret}`,
        },
      }),
    )) as APIGatewayProxyResult;

    expect(res.statusCode).toStrictEqual(400);
  });

  test('returns 400 when additional fields exist', async () => {
    const res = (await handler(
      getApiGatewayEvent({
        body: JSON.stringify({
          code: 'asap|token',
          userId: 'userId',
          additionalField: 'some-field',
        }),
        headers: {
          Authorization: `Basic ${secret}`,
        },
      }),
    )) as APIGatewayProxyResult;

    expect(res.statusCode).toStrictEqual(400);
  });

  test('returns 403 when secret doesnt match', async () => {
    const res = (await handler(
      getApiGatewayEvent({
        body: JSON.stringify({
          code: 'asap|token',
          userId: 'userId',
        }),
        headers: {
          Authorization: 'Basic token',
        },
      }),
    )) as APIGatewayProxyResult;

    expect(res.statusCode).toStrictEqual(403);
  });
});

describe('POST /webhook/users/connections - success', () => {
  beforeAll(() => {
    identity();
  });

  afterEach(() => {
    expect(nock.isDone()).toBe(true);
  });

  test('returns 403 for invalid code', async () => {
    nock(config.baseUrl)
      .get(`/api/content/${config.appName}/users`)
      .query({
        $top: 1,
        $filter: `data/connections/iv/code eq 'invalidConnectCode'`,
      })
      .reply(404);

    const res = (await handler(
      getApiGatewayEvent({
        body: JSON.stringify({
          code: 'invalidConnectCode',
          userId: 'userId',
        }),
        headers: {
          Authorization: `Basic ${secret}`,
        },
      }),
    )) as APIGatewayProxyResult;

    expect(res.statusCode).toStrictEqual(403);
  });

  test('returns 202 for valid code and updates the user', async () => {
    const userId = `google-oauth2|token`;
    const patchedUser = JSON.parse(JSON.stringify(user));
    patchedUser.data.connections.iv = [{ code: userId }];

    nock(config.baseUrl)
      .get(`/api/content/${config.appName}/users`)
      .query({
        $top: 1,
        $filter: `data/connections/iv/code eq 'asapWelcomeCode'`,
      })
      .reply(200, { total: 1, items: [user] })
      .patch(`/api/content/${config.appName}/users/${user.id}`, {
        email: { iv: user.data.email.iv },
        connections: { iv: [{ code: userId }] },
      })
      .reply(200, patchedUser);

    const res = (await handler(
      getApiGatewayEvent({
        body: JSON.stringify({
          code: 'asapWelcomeCode',
          userId,
        }),
        headers: {
          Authorization: `Basic ${secret}`,
        },
      }),
    )) as APIGatewayProxyResult;

    expect(res.statusCode).toStrictEqual(202);
  });
});
