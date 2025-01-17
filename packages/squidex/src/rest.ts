import Boom from '@hapi/boom';
import Got from 'got';
import createClient, { GetAccessToken } from './auth';

export interface Results<T> {
  total: number;
  items: T[];
}

export interface Filter {
  path: string;
  op:
    | 'eq'
    | 'in'
    | 'gt'
    | 'lt'
    | 'le'
    | 'ge'
    | 'ne'
    | 'contains'
    | 'startsWith'
    | 'endsWith';
  value: string[] | number[] | string | number | boolean;
}

export interface Query {
  take?: number;
  skip?: number;
  filter?:
    | {
        and?: Filter[];
        not?: Filter;
        or?: Filter[];
      }
    | Filter;
  sort?: {
    path: string;
    order?: 'ascending' | 'descending';
  }[];
}

export interface ODataQuery {
  $top?: number;
  $skip?: number;
  $filter?: string;
  $orderby?: string;
  $search?: string;
}
export class Squidex<
  T extends { id: string; data: Record<string, unknown> },
  C extends { id: string; data: Record<string, unknown> } = T,
> {
  client: typeof Got;
  collection: string;

  constructor(
    collection: string,
    getAccessToken: GetAccessToken,
    options?: Parameters<typeof createClient>[0],
  ) {
    this.collection = collection;
    this.client = createClient(options, getAccessToken);
  }

  async fetch(query: ODataQuery | Query = {}): Promise<Results<T>> {
    const searchParams = Object.keys(query).includes('$orderby')
      ? ({
          $top: 8,
          ...query,
        } as { [key: string]: string | number | undefined })
      : {
          q: JSON.stringify({
            take: 8,
            ...query,
          }) as string,
        };

    try {
      const res = await this.client
        .get(this.collection, {
          searchParams,
        })
        .json();
      return res as Results<T>;
    } catch (err) {
      if (
        err.response?.statusCode === 400 &&
        err.response?.body.includes('invalid_client')
      ) {
        throw Boom.unauthorized();
      }

      if (err.response?.statusCode === 404) {
        return {
          total: 0,
          items: [],
        };
      }

      throw Boom.badImplementation('squidex', err);
    }
  }

  async fetchById(id: string): Promise<T> {
    try {
      const res = await this.client.get(`${this.collection}/${id}`).json();
      return res as T;
    } catch (err) {
      if (
        err.response?.statusCode === 400 &&
        err.response?.body.includes('invalid_client')
      ) {
        throw Boom.unauthorized();
      }

      if (err.response?.statusCode === 404) {
        throw Boom.notFound();
      }

      throw Boom.badImplementation('squidex', err);
    }
  }

  async fetchOne(query: Query): Promise<T> {
    const { items } = await this.fetch({
      ...query,
      take: 1,
    });

    if (items.length === 0) {
      throw Boom.notFound();
    }

    return items[0];
  }

  async create(json: C['data'], publish = true): Promise<T> {
    try {
      const res = await this.client
        .post(`${this.collection}`, {
          json,
          searchParams: {
            publish,
          },
        })
        .json();
      return res as T;
    } catch (err) {
      if (err.response?.statusCode === 409) {
        throw Boom.conflict();
      }

      if (
        err.response?.statusCode === 400 &&
        err.response?.body.includes('invalid_client')
      ) {
        throw Boom.unauthorized();
      }

      if (err.response?.statusCode === 400) {
        throw Boom.badRequest(err, err.response?.body);
      }

      throw Boom.badImplementation('squidex', err);
    }
  }

  async upsert(id: string, json: T['data'], publish = true): Promise<T> {
    try {
      const res = await this.client
        .patch(`${this.collection}/${id}`, {
          json,
          searchParams: {
            publish,
          },
        })
        .json();
      return res as T;
    } catch (err) {
      if (err.response?.statusCode === 409) {
        throw Boom.conflict();
      }

      if (
        err.response?.statusCode === 400 &&
        err.response?.body.includes('invalid_client')
      ) {
        throw Boom.unauthorized();
      }

      if (err.response?.statusCode === 400) {
        throw Boom.badRequest(err, err.response?.body);
      }

      throw Boom.badImplementation('squidex', err);
    }
  }

  async patch(id: string, json: Partial<T['data']>): Promise<T> {
    try {
      const res = await this.client
        .patch(`${this.collection}/${id}`, {
          json,
        })
        .json();
      return res as T;
    } catch (err) {
      if (
        err.response?.statusCode === 400 &&
        err.response?.body.includes('invalid_client')
      ) {
        throw Boom.unauthorized();
      }

      if (err.response?.statusCode === 400) {
        throw Boom.badImplementation('Bad Request', err);
      }
      if (err.response?.statusCode === 404) {
        throw Boom.notFound();
      }

      throw Boom.badImplementation('squidex', err);
    }
  }

  async put(id: string, json: Partial<T['data']>): Promise<T> {
    try {
      const res = await this.client
        .put(`${this.collection}/${id}`, {
          json,
        })
        .json();
      return res as T;
    } catch (err) {
      if (
        err.response?.statusCode === 400 &&
        err.response?.body.includes('invalid_client')
      ) {
        throw Boom.unauthorized();
      }

      if (err.response?.statusCode === 400) {
        throw Boom.badImplementation('Bad Request', err);
      }
      if (err.response?.statusCode === 404) {
        throw Boom.notFound();
      }

      throw Boom.badImplementation('squidex', err);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.client.delete(`${this.collection}/${id}`).json();
    } catch (err) {
      if (
        err.response?.statusCode === 400 &&
        err.response?.body.includes('invalid_client')
      ) {
        throw Boom.unauthorized();
      }

      throw Boom.badImplementation('squidex', err);
    }
  }
}

export type SquidexRestClient<
  T extends { id: string; data: Record<string, unknown> },
  C extends { id: string; data: Record<string, unknown> } = T,
> = Squidex<T, C>;
