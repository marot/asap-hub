import { FC, lazy } from 'react';
import { DashboardPage, NotFoundPage } from '@asap-hub/react-components';
import { useCurrentUser } from '@asap-hub/react-context';
import { usePrefetchTeams } from '@asap-hub/frontend/src/network/teams/state';
import { CARD_VIEW_PAGE_SIZE } from '@asap-hub/frontend/src/hooks';
import { usePrefetchCalendars } from '@asap-hub/frontend/src/events/calendar/state';
import Frame from '../structure/Frame';
import { useDashboardState } from './state';

const loadBody = () =>
  import(/* webpackChunkName: "dashboard-body" */ './Body');
const Body = lazy(loadBody);
loadBody();

const Dashboard: FC<Record<string, never>> = () => {
  const currentUser = useCurrentUser();
  if (!currentUser) {
    throw new Error('Failed to find out who is currently logged in');
  }

  const { firstName, id, teams } = currentUser;
  const dashboard = useDashboardState();

  usePrefetchTeams({
    currentPage: 0,
    pageSize: CARD_VIEW_PAGE_SIZE,
    searchQuery: '',
    filters: new Set(),
  });
  usePrefetchCalendars();

  if (dashboard) {
    return (
      <DashboardPage firstName={firstName}>
        <Frame title={null}>
          <Body {...dashboard} userId={id} teamId={teams[0]?.id} />
        </Frame>
      </DashboardPage>
    );
  }

  return <NotFoundPage />;
};

export default Dashboard;
