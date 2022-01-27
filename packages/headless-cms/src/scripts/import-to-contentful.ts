import contentfulManagement from 'contentful-management';

// @ts-ignore
import externalAuthors from './squidex-dev-contents/external-authors_2022-01-27-11-33-15.json';
// @ts-ignore
import labs from './squidex-dev-contents/labs_2022-01-27-11-32-52.json';
// @ts-ignore
import researchOutputs from './squidex-dev-contents/research-outputs_2022-01-27-11-32-39.json';
// @ts-ignore
import teams from './squidex-dev-contents/teams_2022-01-27-11-33-28.json';
// @ts-ignore
import users from './squidex-dev-contents/users_2022-01-27-11-32-55.json';

(async () => {
  const client = contentfulManagement.createClient(
    {
      accessToken: 'CFPAT-GWJaiXu3jvtZYqPXrrVWBBlWfbxzArv3jBxwiDIU02M',
    },
    {
      type: 'plain',
      defaults: {
        spaceId: '5v6w5j61tndm',
        environmentId: 'master',
      },
    }
  );

  for (const lab of labs) {
    const output = await client.entry.create({
      contentTypeId: 'labs'
    }, {
      fields: {
        'name': lab.name.iv
      }
    });

    console.log(output);
  }
})();
