import React from 'react';
import css from '@emotion/css';

import { Card, Link, Tag, Paragraph, Headline2 } from '../atoms';
import { perRem, tabletScreen } from '../pixels';
import { TeamMember } from '../../../model/src';
import { teamMembersIcon } from '../icons';

const listStyles = css({
  padding: 0,
  listStyle: 'none',

  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',

  '> .overflow': {
    display: 'none', // can later be activated by previous list items
  },
});

const normalListItemStyles = css({
  counterIncrement: 'skills -1',

  ':not(:nth-last-of-type(2))': {
    paddingRight: `${12 / perRem}em`,
  },

  ':nth-of-type(n + 4)': {
    display: 'none',
    '~ .overflow': {
      display: 'unset',
    },
  },

  [`@media (max-width: ${tabletScreen.min - 1}px)`]: {
    ':nth-of-type(n + 3)': {
      display: 'none',
      '~ .overflow': {
        display: 'unset',
      },
    },
  },
});

const overflowContentStyles = css({
  '::after': {
    content: '"+" counter(skills)',
  },
});

const teamMemberStyles = css({
  display: 'flex',
  alignItems: 'center',
});
const iconStyles = css({
  display: 'inline-block',
  width: `${24 / perRem}em`,
  height: `${24 / perRem}em`,
  paddingRight: `${6 / perRem}em`,
});

interface TeamCardProps {
  readonly id: string;
  readonly displayName: string;
  readonly projectSummary?: string;
  readonly skills: string[];
  readonly members: TeamMember[];
}
const TeamCard: React.FC<TeamCardProps> = ({
  id,
  displayName,
  projectSummary,
  skills,
  members,
}) => {
  return (
    <Link theme={null} href={`/teams/${id}`}>
      <Card>
        <Headline2 styleAsHeading={4}>{displayName}</Headline2>
        <Paragraph>{projectSummary}</Paragraph>
        {!!skills.length && (
          <ul css={[listStyles, { counterReset: `skills ${skills.length}` }]}>
            {skills.map((skill, index) => (
              <li key={index} css={normalListItemStyles}>
                <Tag>{skill}</Tag>
              </li>
            ))}
            <li key="overflow" className="overflow">
              <Tag>
                <span css={overflowContentStyles}></span>
              </Tag>
            </li>
          </ul>
        )}
        <span css={teamMemberStyles}>
          <span css={iconStyles}>{teamMembersIcon} </span>
          {members.length} Team Member
          {members.length !== 1 ? 's' : ''}
        </span>
      </Card>
    </Link>
  );
};

export default TeamCard;
