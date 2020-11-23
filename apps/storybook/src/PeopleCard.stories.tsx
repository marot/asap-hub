import React from 'react';
import { text, date, number, select } from '@storybook/addon-knobs';

import { PeopleCard } from '@asap-hub/react-components';

export default {
  title: 'Organisms / Network / People Card',
};

export const Normal = () => (
  <PeopleCard
    displayName={text('Display Name', 'Phillip Mars, PhD')}
    createdDate={new Date(
      date('Created Date', new Date(2020, 6, 12, 14, 32)),
    ).toISOString()}
    institution={text('Institution', 'Yale University')}
    firstName={text('First Name', 'Phillip')}
    lastName={text('Last Name', 'Mars')}
    location={text('Location', 'New Haven, Connecticut')}
    teams={Array(number('Number of Teams', 1)).fill({
      id: '42',
      href: '#42',
      role: text('Role', 'Researcher'),
      displayName: text('Team Name', 'A'),
    })}
    jobTitle={text('Job Title', 'Assistant Professor')}
    avatarUrl={text(
      'Avatar URL',
      'https://www.hhmi.org/sites/default/files/styles/epsa_250_250/public/Programs/Investigator/Randy-Schekman-400x400.jpg',
    )}
    href="#"
    role={select('ASAP Hub Role', ['Staff', 'Grantee', 'Guest'], 'Grantee')}
  />
);
