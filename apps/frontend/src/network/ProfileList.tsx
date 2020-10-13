import React from 'react';

import { Paragraph, NetworkPeople } from '@asap-hub/react-components';
import { join } from 'path';
import { UserResponse } from '@asap-hub/model';

import { useUsers } from '../api';

interface ProfileListProps {
  searchQuery?: string;
  filters?: Set<string>;
}

const ProfileList: React.FC<ProfileListProps> = ({
  searchQuery,
  filters = new Set(),
}) => {
  const { loading, data: usersData, error } = useUsers({
    searchQuery,
    filters: [...filters],
  });

  if (loading) {
    return <Paragraph>Loading...</Paragraph>;
  }

  if (usersData) {
    const users = usersData.items.map((user: UserResponse) => ({
      ...user,
      href: join('/network/users', user.id),
      teams: user.teams.map((team) => ({
        ...team,
        href: `/network/teams/${team.id}`,
      })),
    }));
    return (
      <NetworkPeople
        people={users}
        numberOfItems={users.length}
        numberOfPages={1}
        currentPageIndex={0}
        renderPageHref={() => ''}
      />
    );
  }

  return (
    <Paragraph>
      {error.name}
      {': '}
      {error.message}
    </Paragraph>
  );
};

export default ProfileList;
