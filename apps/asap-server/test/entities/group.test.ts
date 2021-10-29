import { parseGraphQLGroup } from '../../src/entities/group';
import { FetchGroupQuery } from '../../src/gql/graphql';
import { getGraphqlGroup } from '../fixtures/groups.fixtures';

describe('parseGraphQLGroup', () => {
  const group = getGraphqlGroup() as NonNullable<
    FetchGroupQuery['findGroupsContent']
  >;
  it('should throw when Leaders group roles are invalid', () => {
    const invalidLeaders = [
      { ...group.flatData.leaders![0], role: 'invalid role' },
    ];
    const groupWithInvalidLeaders = {
      ...group,
      flatData: { ...group.flatData, leaders: invalidLeaders },
    };

    expect(() => parseGraphQLGroup(groupWithInvalidLeaders)).toThrow(
      'Invalid group role on leaders : invalid role',
    );
  });
});
