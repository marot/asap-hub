import { ListGroupResponse } from '@asap-hub/model';
import { createSentryHeaders } from '../../../api-util';

import { API_BASE_URL } from '../../../config';

export const getTeamGroups = async (
  id: string,
  authorization: string,
): Promise<ListGroupResponse | undefined> => {
  const resp = await fetch(`${API_BASE_URL}/teams/${id}/groups`, {
    headers: { authorization, ...createSentryHeaders() },
  });
  if (!resp.ok) {
    if (resp.status === 404) {
      return undefined;
    }
    throw new Error(
      `Failed to fetch team groups with id ${id}. Expected status 2xx or 404. Received status ${`${resp.status} ${resp.statusText}`.trim()}.`,
    );
  }
  return resp.json();
};
