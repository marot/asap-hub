import nock from 'nock';
import { UserPatchRequest, UserResponse } from '@asap-hub/model';
import { createUserResponse } from '@asap-hub/fixtures';

import { getUser, patchUser } from '../api';
import { API_BASE_URL } from '../../../config';

jest.mock('../../../config');

afterEach(() => {
  nock.cleanAll();
});

describe('getUser', () => {
  it('makes an authorized GET request for the user id', async () => {
    nock(API_BASE_URL, { reqheaders: { authorization: 'Bearer x' } })
      .get('/users/42')
      .reply(200, {});
    await getUser('42', 'Bearer x');
    expect(nock.isDone()).toBe(true);
  });

  it('returns a successfully fetched user', async () => {
    const user = createUserResponse();
    nock(API_BASE_URL).get('/users/42').reply(200, user);
    expect(await getUser('42', '')).toEqual(user);
  });

  it('returns undefined for a 404', async () => {
    nock(API_BASE_URL).get('/users/42').reply(404);
    expect(await getUser('42', '')).toBe(undefined);
  });

  it('errors for another status', async () => {
    nock(API_BASE_URL).get('/users/42').reply(500);
    await expect(getUser('42', '')).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Failed to fetch user with id 42. Expected status 2xx or 404. Received status 500."`,
    );
  });
});

describe('patchUser', () => {
  it('makes an authorized PATCH request for the user id', async () => {
    const patch: UserPatchRequest = { biography: 'New Bio' };
    nock(API_BASE_URL, { reqheaders: { authorization: 'Bearer x' } })
      .patch('/users/42')
      .reply(200, {});

    await patchUser('42', patch, 'Bearer x');
    expect(nock.isDone()).toBe(true);
  });

  it('passes the patch object in the body', async () => {
    const patch = { biography: 'New Bio' };
    nock(API_BASE_URL).patch('/users/42', patch).reply(200, {});

    await patchUser('42', patch, '');
    expect(nock.isDone()).toBe(true);
  });

  it('returns a successfully updated user', async () => {
    const patch = { biography: 'New Bio' };
    const updated: Partial<UserResponse> = {
      email: 'someone@example.com',
      biography: 'New Bio',
    };
    nock(API_BASE_URL).patch('/users/42', patch).reply(200, updated);

    expect(await patchUser('42', patch, '')).toEqual(updated);
  });

  it('errors for an error status', async () => {
    const patch = { biography: 'New Bio' };
    nock(API_BASE_URL).patch('/users/42', patch).reply(500, {});

    await expect(
      patchUser('42', patch, ''),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Failed to update user with id 42. Expected status 2xx. Received status 500."`,
    );
  });
});