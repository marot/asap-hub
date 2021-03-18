import React, { useState, useEffect, ComponentProps } from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { GroupProfilePage, NotFoundPage } from '@asap-hub/react-components';
import { network, useRouteParams } from '@asap-hub/routing';
import { useDebounce } from 'use-debounce';

import { useGroupById } from './state';
import Frame from '../../structure/Frame';
import { useSearch } from '../../hooks';

const loadAbout = () =>
  import(/* webpackChunkName: "network-group-about" */ './About');
const loadCalendar = () =>
  import(/* webpackChunkName: "network-group-calendar" */ './Calendar');
const loadEventList = () =>
  import(
    /* webpackChunkName: "network-group-event-list" */ './events/EventList'
  );

const About = React.lazy(loadAbout);
const Calendar = React.lazy(loadCalendar);
const EventList = React.lazy(loadEventList);
loadAbout();

const GroupProfile: React.FC = () => {
  useEffect(() => {
    loadAbout().then(loadCalendar).then(loadEventList);
  }, []);

  const [groupTeamsElementId] = useState(`group-teams-${uuid()}`);
  const [currentTime] = useState(new Date());

  const { searchQuery, setSearchQuery } = useSearch();
  const [debouncedSearchQuery] = useDebounce(searchQuery, 400);

  const route = network({}).groups({}).group;
  const { groupId } = useRouteParams(route);
  const { path } = useRouteMatch();
  const group = useGroupById(groupId);

  if (group) {
    const props: ComponentProps<typeof GroupProfilePage> = {
      id: group.id,
      name: group.name,
      lastModifiedDate: group.lastModifiedDate,
      numberOfTeams: group.teams.length,
      groupTeamsHref: `${
        route({ groupId }).about({}).$
      }#${groupTeamsElementId}`,
    };

    return (
      <Switch>
        <Route path={path + route({ groupId }).about.template}>
          <GroupProfilePage {...props}>
            <Frame>
              <About group={group} groupTeamsElementId={groupTeamsElementId} />
            </Frame>
          </GroupProfilePage>
        </Route>
        <Route path={path + route({ groupId }).calendar.template}>
          <GroupProfilePage {...props}>
            <Frame>
              <Calendar calendars={group.calendars} />
            </Frame>
          </GroupProfilePage>
        </Route>
        <Route path={path + route({ groupId }).upcoming.template}>
          <GroupProfilePage
            {...props}
            searchQuery={searchQuery}
            onChangeSearchQuery={setSearchQuery}
          >
            <Frame>
              <EventList
                currentTime={currentTime}
                searchQuery={debouncedSearchQuery}
              />
            </Frame>
          </GroupProfilePage>
        </Route>
        <Route path={path + route({ groupId }).past.template}>
          <GroupProfilePage
            {...props}
            searchQuery={searchQuery}
            onChangeSearchQuery={setSearchQuery}
          >
            <Frame>
              <EventList
                past
                currentTime={currentTime}
                searchQuery={debouncedSearchQuery}
              />
            </Frame>
          </GroupProfilePage>
        </Route>
        <Redirect to={route({ groupId }).about({}).$} />
      </Switch>
    );
  }

  return <NotFoundPage />;
};

export default GroupProfile;
