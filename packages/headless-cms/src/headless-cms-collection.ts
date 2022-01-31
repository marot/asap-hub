import { ListResponse } from '@asap-hub/model';

export interface HeadlessCmsCollection<EntityType> {
  fetch(options: unknown): Promise<ListResponse<EntityType>>;
  fetchById(id: string): Promise<EntityType | null>;
}
