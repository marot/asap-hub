import Boom from '@hapi/boom';
import Debug from 'debug';
import path from 'path';
import url from 'url';
import Intercept from 'apr-intercept';
import get from 'lodash.get';
import { Squidex } from '@asap-hub/services-common';
import { Invitee, UserResponse, ListUserResponse } from '@asap-hub/model';

import { CMS } from '../cms';
import { CMSUser, CMSOrcidWork } from '../entities/user';
import { sendEmail } from '../utils/send-mail';
import { origin } from '../config';
import { fetchOrcidProfile, ORCIDWorksResponse } from '../utils/fetch-orcid';
import { createURL } from '../utils/assets';

export const transform = (user: CMSUser): UserResponse => {
  return JSON.parse(
    JSON.stringify({
      id: user.id,
      createdDate: user.created,
      lastModifiedDate: user.data.lastModifiedDate?.iv,
      displayName: user.data.displayName.iv,
      email: user.data.email.iv,
      firstName: user.data.firstName?.iv,
      middleName: user.data.middleName?.iv,
      lastName: user.data.lastName?.iv,
      biography: user.data.biography?.iv,
      jobTitle: user.data.jobTitle?.iv,
      institution: user.data.institution?.iv,
      teams:
        user.data.teams?.iv.map(({ id, ...t }) => ({ id: id[0], ...t })) || [],
      location: user.data.location?.iv,
      orcid: user.data.orcid?.iv,
      orcidLastSyncDate: user.data.orcidLastSyncDate?.iv,
      orcidLastModifiedDate: user.data.orcidLastModifiedDate?.iv,
      orcidWorks: user.data.orcidWorks?.iv,
      skills: user.data.skills?.iv || [],
      questions: user.data.questions?.iv.map(({ question }) => question) || [],
      avatarURL: user.data.avatar && createURL(user.data.avatar.iv)[0],
    }),
  );
};

function transformOrcidWorks(
  orcidWorks: ORCIDWorksResponse,
): { lastModifiedDate: string; works: CMSOrcidWork[] } {
  // parse & stringify to remove undefined values
  return {
    lastModifiedDate: `${orcidWorks['last-modified-date']?.value}`,
    works: orcidWorks.group.map((work) =>
      JSON.parse(
        JSON.stringify({
          doi: get(work, 'external-ids.external-id[0].external-id-url.value'),
          id: `${work['work-summary'][0]['put-code']}`,
          title: get(work, '["work-summary"][0].title.title.value'),
          type: get(work, '["work-summary"][0].type'),
          publicationDate: {
            year: get(
              work,
              '["work-summary"][0]["publication-date"].year.value',
            ),
            month: get(
              work,
              '["work-summary"][0]["publication-date"].month.value',
            ),
            day: get(work, '["work-summary"][0]["publication-date"].day.value'),
          },
          lastModifiedDate: `${work['last-modified-date'].value}`,
        }),
      ),
    ),
  };
}

const debug = Debug('users.create');
export default class Users {
  cms: CMS;

  users: Squidex<CMSUser>;

  constructor() {
    this.cms = new CMS();
    this.users = new Squidex('users');
  }

  async create(user: Invitee): Promise<UserResponse> {
    const [conflict, createdUser] = await Intercept(
      this.cms.users.create(user),
    );
    if (conflict) {
      throw Boom.conflict('Duplicate');
    }

    const [{ code }] = createdUser.data.connections.iv;
    const link = new url.URL(path.join(`/welcome/${code}`), origin);

    const [err] = await Intercept(
      sendEmail({
        to: [user.email],
        template: 'Welcome',
        values: {
          firstName: user.displayName,
          link: link.toString(),
        },
      }),
    );

    // istanbul ignore if
    if (err) {
      debug(err);
    }

    return transform(createdUser);
  }

  async fetch(options: {
    take: number;
    skip: number;
  }): Promise<ListUserResponse> {
    const query = {
      ...options,
      sort: [{ path: 'data.displayName.iv' }],
    };

    const res = await this.users.fetch(query);
    return {
      total: res.total,
      items: res.items.map(transform),
    };
  }

  async fetchById(id: string): Promise<UserResponse> {
    const [notFound, user] = await Intercept(this.cms.users.fetchById(id));
    if (notFound) {
      throw Boom.notFound();
    }
    return transform(user);
  }

  async fetchByCode(code: string): Promise<UserResponse> {
    const user = await this.cms.users.fetchByCode(code);
    if (!user) {
      throw Boom.forbidden();
    }
    return transform(user);
  }

  async connectByCode(code: string, userId: string): Promise<UserResponse> {
    const user = await this.cms.users.fetchByCode(code);
    if (!user) {
      throw Boom.forbidden();
    }
    return transform(await this.cms.users.connectByCode(user, userId));
  }

  async syncOrcidProfile(
    id: string,
    cachedUser: CMSUser | undefined = undefined,
  ): Promise<UserResponse> {
    let fetchedUser;
    if (!cachedUser) {
      let notFound;
      [notFound, fetchedUser] = await Intercept(this.cms.users.fetchById(id));

      if (notFound) {
        throw Boom.notFound();
      }
    }

    const user = cachedUser || (fetchedUser as CMSUser);

    const [error, res] = await Intercept(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      fetchOrcidProfile(user!.data.orcid!.iv),
    );

    if (error) {
      throw Boom.badGateway();
    }

    const { lastModifiedDate, works } = transformOrcidWorks(res);

    if (
      !user.data.orcidLastModifiedDate?.iv ||
      user.data.orcidLastModifiedDate.iv < lastModifiedDate
    ) {
      return transform(
        await this.cms.users.updateOrcidWorks(
          user,
          lastModifiedDate,
          works.slice(0, 10),
        ),
      );
    }

    return transform(user);
  }
}
