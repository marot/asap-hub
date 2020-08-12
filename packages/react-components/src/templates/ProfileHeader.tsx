import React from 'react';
import css from '@emotion/css';
import formatDistance from 'date-fns/formatDistance';

import { perRem, contentSidePaddingWithNavigation } from '../pixels';
import { Avatar, Button, Headline2, Link, Paragraph, TabLink } from '../atoms';
import { TabNav } from '../molecules';

const containerStyles = css({
  padding: `0 ${contentSidePaddingWithNavigation(8)}`,
  alignSelf: 'stretch',
});

const paddingContainer = css({
  paddingTop: `${36 / perRem}em`,
  paddingBottom: `${36 / perRem}em`,
});

const flexContainer = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const lastUpdatedContainer = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
});

type ProfileProps = {
  readonly department: string;
  readonly displayName: string;
  readonly institution: string;
  readonly lastModified: Date;
  readonly initials: string;
  readonly location?: string;
  readonly role: string;
  readonly team: string;
  readonly title: string;

  readonly aboutHref: string;
  readonly researchInterestsHref: string;
  readonly outputsHref: string;
};

const ProfileHeader: React.FC<ProfileProps> = ({
  department,
  displayName,
  institution,
  initials,
  lastModified,
  location,
  role,
  team,
  title,

  aboutHref,
  researchInterestsHref,
  outputsHref,
}) => {
  return (
    <div css={containerStyles}>
      <div css={[paddingContainer]}>
        <div css={[flexContainer]}>
          <div>
            <Headline2>{displayName}</Headline2>
            <Paragraph>
              {title} at {institution}, {department}
              <br />
              {role} on <Link href={'/'}>{team}</Link>
            </Paragraph>
            {location && <Paragraph>{location}</Paragraph>}
          </div>
          <div>
            <Avatar border initials={initials} />
          </div>
        </div>
        <div css={[flexContainer]}>
          <Button small primary>
            Contact
          </Button>
          {lastModified && (
            <div css={[lastUpdatedContainer]}>
              <p>
                Last updated: {formatDistance(new Date(), lastModified)} ago
              </p>
            </div>
          )}
        </div>
      </div>
      <TabNav>
        <TabLink href={aboutHref}>About</TabLink>
        <TabLink href={researchInterestsHref}>Research Interests</TabLink>
        <TabLink href={outputsHref}>Shared Outputs</TabLink>
      </TabNav>
    </div>
  );
};

export default ProfileHeader;
