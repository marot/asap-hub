import { css } from '@emotion/react';

import { Display, Paragraph } from '../atoms';
import { perRem } from '../pixels';
import { paper, steel } from '../colors';
import { contentSidePaddingWithNavigation } from '../layout';

const containerStyles = css({
  background: paper.rgb,
  boxShadow: `0 2px 4px -2px ${steel.rgb}`,
  marginBottom: '2px',
  padding: `${36 / perRem}em ${contentSidePaddingWithNavigation(8)} ${
    48 / perRem
  }em `,
});

const textStyles = css({
  maxWidth: `${610 / perRem}em`,
});

const NewsAndEventsPageHeader: React.FC = () => (
  <header css={containerStyles}>
    <Display styleAsHeading={2}>News</Display>
    <div css={textStyles}>
      <Paragraph accent="lead">
        Stay up to date with all the latest activity from the CRN. You'll be
        able to access news and newsletters
      </Paragraph>
    </div>
  </header>
);

export default NewsAndEventsPageHeader;
