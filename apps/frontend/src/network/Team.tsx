import React from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Paragraph,
  TeamPage,
  TeamAbout,
  TeamOutputs,
  NotFoundPage,
  ErrorCard,
} from '@asap-hub/react-components';
import { join } from 'path';

import { useTeamById } from '../api';

const Page: React.FC<{}> = () => {
  const {
    url,
    path,
    params: { id },
  } = useRouteMatch();

  const { loading, data: team } = useTeamById(id);

  if (loading) {
    return <Paragraph>Loading...</Paragraph>;
  }

  if (team) {
    const teamPageProps = {
      ...team,
      aboutHref: join(url, 'about'),
      outputsHref: join(url, 'outputs'),
    };

    return (
      <TeamPage {...teamPageProps}>
        <ErrorBoundary FallbackComponent={ErrorCard}>
          <Switch>
            <Route path={`${path}/about`}>
              <TeamAbout
                {...team}
                proposalHref={
                  team.proposalURL
                    ? join('/library/', team.proposalURL)
                    : undefined
                }
              />
            </Route>
            <Route path={`${path}/outputs`}>
              <TeamOutputs />
            </Route>
            <Redirect to={join(url, 'about')} />
          </Switch>
        </ErrorBoundary>
      </TeamPage>
    );
  }

  return <NotFoundPage />;
};

export default Page;
