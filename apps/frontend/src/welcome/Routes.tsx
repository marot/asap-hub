import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Welcome from './Welcome';

const Users: React.FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:code`} component={Welcome} />
    </Switch>
  );
};

export default Users;
