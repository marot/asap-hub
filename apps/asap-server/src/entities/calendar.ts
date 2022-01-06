import { CalendarResponse, isGoogleLegacyCalendarColor } from '@asap-hub/model';
import { RestCalendar } from '@asap-hub/squidex';
import { FetchCalendarQuery } from '../gql/graphql';

export const parseRestCalendar = (item: RestCalendar): CalendarResponse => ({
  id: item.data.googleCalendarId.iv,
  color: item.data.color.iv,
  name: item.data.name.iv,
});

export const parseGraphqlCalendar = (item: {
  flatData: Pick<
    NonNullable<FetchCalendarQuery['findCalendarsContent']>['flatData'],
    'googleCalendarId' | 'color' | 'name'
  >;
}): CalendarResponse => ({
  id: item.flatData.googleCalendarId ?? '',
  // default should never be picked. Field required on CMS
  color: isGoogleLegacyCalendarColor(item.flatData.color)
    ? item.flatData.color
    : ('#333333' as const),
  name: item.flatData.name ?? '',
});
