import React from 'react';
import { NetworkTeams, Loading } from '@asap-hub/react-components';
import { TeamResponse } from '@asap-hub/model';
import { join } from 'path';

import { useTeams } from '@asap-hub/frontend/src/api';
import { usePaginationParams, usePagination } from '../../hooks';
import { NETWORK_PATH } from '../../routes';
import { TEAMS_PATH } from '../routes';

interface NetworkTeamListProps {
  searchQuery?: string;
}

const NetworkTeamList: React.FC<NetworkTeamListProps> = ({ searchQuery }) => {
  const { currentPage, pageSize } = usePaginationParams();

  const result = useTeams({
    searchQuery,
    currentPage,
    pageSize,
  });

  const { numberOfPages, renderPageHref } = usePagination(
    result.data?.total ?? 0,
    pageSize,
  );

  if (result.loading) {
    return <Loading />;
  }

  const teams = result.data.items.map((team: TeamResponse) => ({
    ...team,
    href: join(`${NETWORK_PATH}/${TEAMS_PATH}`, team.id),
  }));
  return (
    <NetworkTeams
      teams={teams}
      numberOfItems={result.data.total}
      numberOfPages={numberOfPages}
      currentPageIndex={currentPage}
      renderPageHref={renderPageHref}
    />
  );
};

export default NetworkTeamList;