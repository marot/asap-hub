import React from 'react';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import nock from 'nock';
import { authTestUtils } from '@asap-hub/react-components';
import { createTeamListResponse } from '@asap-hub/fixtures';

import Teams from '../TeamList';
import { API_BASE_URL } from '../../config';

// fetch user by code request
beforeEach(() => {
  nock.cleanAll();
});

const renderTeamList = async (waitForLoading = true) => {
  const result = render(
    <authTestUtils.Auth0Provider>
      <authTestUtils.WhenReady>
        <authTestUtils.LoggedIn user={undefined}>
          <MemoryRouter initialEntries={['/teams']}>
            <Route path="/teams" component={Teams} />
          </MemoryRouter>
        </authTestUtils.LoggedIn>
      </authTestUtils.WhenReady>
    </authTestUtils.Auth0Provider>,
  );
  await waitFor(() =>
    expect(result.queryByText(/auth0/i)).not.toBeInTheDocument(),
  );
  if (waitForLoading)
    await waitFor(() =>
      expect(result.queryByText(/Loading/i)).not.toBeInTheDocument(),
    );
  return result;
};

it('renders a loading indicator', async () => {
  nock(API_BASE_URL, {
    reqheaders: { authorization: 'Bearer token' },
  })
    .get('/teams')
    .reply(200, createTeamListResponse(1));
  const { getByText } = await renderTeamList(false);

  const loadingIndicator = getByText(/loading/i);
  expect(loadingIndicator).toBeVisible();

  await waitForElementToBeRemoved(loadingIndicator);
});

it('renders a list of teams information', async () => {
  const response = createTeamListResponse(1);
  nock(API_BASE_URL, {
    reqheaders: { authorization: 'Bearer token' },
  })
    .get('/teams')
    .reply(200, {
      ...response,
      items: response.items.map((item) => ({
        ...item,
        displayName: 'Name Unknown',
        projectTitle: 'Project Title Unknown',
      })),
    });
  const { container } = await renderTeamList();
  expect(container.textContent).toContain('Name Unknown');
  expect(container.textContent).toContain('Project Title Unknown');
});
