import encode from 'jwt-encode';
import nock from 'nock';
import { getAccessToken } from '../src/client';
import config from '../src/config';

describe('Get Access Token', () => {
  const mockToken = encode(
    {
      exp: Math.floor((new Date().getTime() + 1) / 1000),
      nbf: Math.floor(new Date().getTime() / 1000),
    },
    'secret',
  );

  beforeAll(() => {
    delete require.cache[require.resolve('../src/client')];
  });

  test('Should retry after the first failed attempt', async () => {
    nock(config.baseUrl)
      .post(
        '/identity-server/connect/token',
        `grant_type=client_credentials&scope=squidex-api&client_id=${encodeURIComponent(
          config.clientId,
        )}&client_secret=${config.clientSecret}`,
      )
      .reply(521);

    await expect(getAccessToken()).rejects.toThrow();

    nock(config.baseUrl)
      .post(
        '/identity-server/connect/token',
        `grant_type=client_credentials&scope=squidex-api&client_id=${encodeURIComponent(
          config.clientId,
        )}&client_secret=${config.clientSecret}`,
      )
      .reply(200, {
        access_token: mockToken,
        expires_in: 2592000,
        token_type: 'Bearer',
        scope: 'squidex-api',
      });

    expect(await getAccessToken()).toBe(mockToken);
  });
});
