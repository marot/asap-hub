import React from 'react';
import css from '@emotion/css';

import { Card, Headline2, Paragraph, Link } from '../atoms';
import { docsIcon } from '../icons';
import { mobileScreen } from '../pixels';

const stretchOnMobile = css({
  display: 'flex',
  [`@media (max-width: ${mobileScreen.width}px)`]: {
    flexDirection: 'column',
  },
});

type ProfileBiographyProps = {
  readonly biography: string;
  readonly biosketch?: string;
};
const ProfileBiography: React.FC<ProfileBiographyProps> = ({
  biography,
  biosketch,
}) => {
  return (
    <Card>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Headline2 styleAsHeading={3}>Biography</Headline2>
        <Paragraph accent="lead">{biography}</Paragraph>
        {biosketch && (
          <div css={stretchOnMobile}>
            <Link buttonStyle href={biosketch}>
              {docsIcon}
              View Biosketch
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProfileBiography;
