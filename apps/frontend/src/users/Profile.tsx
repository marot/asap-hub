import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { join } from 'path';
import { Paragraph, ProfilePage, Layout } from '@asap-hub/react-components';

import { useUserById } from '../api';

const Profile: React.FC<{}> = () => {
  const {
    url,
    path,
    params: { id },
  } = useRouteMatch();

  const { loading, data: profile, error } = useUserById(id);

  if (loading) {
    return (
      <Layout navigation>
        <Paragraph>Loading...</Paragraph>
      </Layout>
    );
  }

  if (profile) {
    const profilePageProps = {
      ...profile,
      aboutHref: join(url, 'about'),
      researchInterestsHref: join(url, './research-interests'),
      outputsHref: join(url, 'outputs'),
    };

    return (
      <Switch>
        <Route
          path={`${path}/about`}
          render={() => <ProfilePage {...profilePageProps} tab="about" />}
        />
        <Route
          path={`${path}/research-interests`}
          render={() => (
            <ProfilePage {...profilePageProps} tab="researchInterests" />
          )}
        />
        <Route
          path={`${path}/outputs`}
          render={() => <ProfilePage {...profilePageProps} tab="outputs" />}
        />
        <Redirect to={join(url, 'about')} />
      </Switch>
    );
  }

  return (
    <Layout navigation>
      <Paragraph>
        {error.name}
        {': '}
        {error.message}
      </Paragraph>
    </Layout>
  );
};

export default Profile;
