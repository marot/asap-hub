import React, { ComponentProps } from 'react';
import { render } from '@testing-library/react';
import { createEventResponse } from '@asap-hub/fixtures';

import EventsUpcoming from '../EventsUpcoming';

const props = (
  events: ComponentProps<typeof EventsUpcoming>['events'],
): ComponentProps<typeof EventsUpcoming> => ({
  events,
  numberOfItems: events.length,
  numberOfPages: 1,
  currentPageIndex: 0,
  renderPageHref: (index) => `#${index}`,
});

it('renders multiple event cards', () => {
  const { getAllByRole } = render(
    <EventsUpcoming
      {...props([
        {
          ...createEventResponse({}, 0),
          href: '',
          title: 'FirstEvent',
          groups: [],
        },
        {
          ...createEventResponse({}, 1),
          href: '',
          title: 'SecondEvent',
          groups: [],
        },
      ])}
    />,
  );
  expect(
    getAllByRole('heading').map(({ textContent }) => textContent),
  ).toEqual(['FirstEvent', 'SecondEvent']);
});
