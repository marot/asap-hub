import React, { ComponentProps } from 'react';
import { NewsAndEventsPageBody } from '@asap-hub/react-components';

export default {
  title: 'Templates / News and Events / Page Body',
};

const props = (): ComponentProps<typeof NewsAndEventsPageBody> => ({
  newsAndEvents: [
    {
      id: 'uuid-1',
      created: new Date().toISOString(),
      type: 'News' as const,
      title: "Coordinating different approaches into Parkinson's",
      href: '#',
    },
    {
      id: 'uuid-2',
      created: new Date().toISOString(),
      type: 'Event' as const,
      title:
        'Welcome to the ASAP Collaborative Initiative: The Science & the scientists',
      href: '#',
    },
  ],
});

export const Normal = () => <NewsAndEventsPageBody {...props()} />;
