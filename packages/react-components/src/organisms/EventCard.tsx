import { ComponentProps } from 'react';
import {
  eventMaterialTypes,
  EventResponse,
  EVENT_CONSIDERED_IN_PROGRESS_MINUTES_BEFORE_EVENT,
  EVENT_CONSIDERED_PAST_HOURS_AFTER_EVENT,
} from '@asap-hub/model';
import { addHours, subMinutes, parseISO } from 'date-fns';

import { ToastCard, TagList, EventInfo } from '../molecules';
import { Link } from '../atoms';
import { useDateHasPassed } from '../date';

type EventCardProps = ComponentProps<typeof EventInfo> &
  Pick<
    EventResponse,
    | 'tags'
    | 'status'
    | 'meetingLink'
    | 'hideMeetingLink'
    | 'notes'
    | 'videoRecording'
    | 'presentation'
    | 'meetingMaterials'
  >;
const EventCard: React.FC<EventCardProps> = ({ status, tags, ...props }) => {
  const considerStartedAfter = subMinutes(
    parseISO(props.startDate),
    EVENT_CONSIDERED_IN_PROGRESS_MINUTES_BEFORE_EVENT,
  );
  const considerEndedAfter = addHours(
    parseISO(props.endDate),
    EVENT_CONSIDERED_PAST_HOURS_AFTER_EVENT,
  );

  const started = useDateHasPassed(considerStartedAfter);
  const finished = useDateHasPassed(considerEndedAfter);
  const toastCardProps = (): Omit<
    ComponentProps<typeof ToastCard>,
    'children'
  > => {
    if (status === 'Cancelled') {
      return { toastContent: 'This event has been cancelled', type: 'alert' };
    }
    if (started && !finished) {
      return {
        type: 'live',
        toastContent: (
          <span>
            This event is currently happening.{' '}
            {props.meetingLink && !props.hideMeetingLink && (
              <Link href={props.meetingLink}>Join the meeting now</Link>
            )}
          </span>
        ),
      };
    }
    if (finished) {
      const materialCount = eventMaterialTypes.reduce((count, key) => {
        const value = props[key];
        if (Array.isArray(value)) {
          return count + value.length;
        }
        if (value) {
          return count + 1;
        }
        return count;
      }, 0);
      if (materialCount > 0) {
        return {
          type: 'attachment',
          toastContent: `Meeting materials (${materialCount})`,
        };
      }
      if (eventMaterialTypes.every((value) => props[value] === null)) {
        return {
          type: 'attachment',
          toastContent: 'No meeting materials available',
        };
      }
      return {
        type: 'attachment',
        toastContent: 'Meeting materials coming soon…',
      };
    }
    return {};
  };

  return (
    <ToastCard {...toastCardProps()}>
      <EventInfo {...props} status={status} />
      <TagList tags={tags} max={3} />
    </ToastCard>
  );
};

export default EventCard;
