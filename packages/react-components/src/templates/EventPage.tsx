import React, { ComponentProps } from 'react';
import css from '@emotion/css';
import { EventResponse } from '@asap-hub/model';
import formatDistance from 'date-fns/formatDistance';

import { EventInfo, EventDescription, BackLink } from '../molecules';
import { Card, Paragraph } from '../atoms';
import { perRem } from '../pixels';
import { contentSidePaddingWithNavigation } from '../layout';
import { JoinEvent, RichTextCard } from '../organisms';

const containerStyles = css({
  padding: `${36 / perRem}em ${contentSidePaddingWithNavigation(8)}`,
});
const cardsStyles = css({
  display: 'grid',
  rowGap: `${36 / perRem}em`,
});

type EventPageProps = ComponentProps<typeof EventInfo> &
  ComponentProps<typeof JoinEvent> &
  ComponentProps<typeof EventDescription> &
  Pick<
    EventResponse,
    'lastModifiedDate' | 'notes' | 'videoRecording' | 'presentation'
  > & {
    readonly backHref: string;
  };
const EventPage: React.FC<EventPageProps> = ({
  backHref,
  lastModifiedDate,
  notes,
  videoRecording,
  presentation,
  ...props
}) => (
  <div css={containerStyles}>
    <BackLink href={backHref} />
    <div css={cardsStyles}>
      <Card>
        <EventInfo {...props} titleLimit={null} />
        <Paragraph accent="lead">
          <small>
            Last updated:{' '}
            {formatDistance(new Date(), new Date(lastModifiedDate))} ago
          </small>
        </Paragraph>
        <JoinEvent {...props} />
        <EventDescription {...props} />
      </Card>
      <RichTextCard text={notes} title="Meeting materials" />
      <RichTextCard text={videoRecording} title="Video recording" />
      <RichTextCard text={presentation} title="Presentation" />
    </div>
  </div>
);

export default EventPage;
