import React from 'react';
import { UserResponse } from '@asap-hub/model';
import css from '@emotion/css';

import { Card, Headline2, Headline3, Divider } from '../atoms';

type ProfileSkillsProps = Pick<UserResponse, 'firstName' | 'questions'>;

const containerStyles = css({
  display: 'flex',
  flexDirection: 'column',
});

const ProfileSkills: React.FC<ProfileSkillsProps> = ({
  firstName,
  questions = [],
}) => {
  return (
    <Card>
      <Headline2 styleAsHeading={3}>
        {firstName ? `${firstName}'s Open Questions` : 'Open Questions'}
      </Headline2>
      <div css={containerStyles}>
        {questions
          .flatMap((question, idx) => {
            const component = (
              <Headline3 key={`q-${idx}`} styleAsHeading={4}>
                {`Q: ${question}`}
              </Headline3>
            );
            return [<Divider key={`sep-${idx}`} />, component];
          })
          .slice(1)}
      </div>
    </Card>
  );
};

export default ProfileSkills;