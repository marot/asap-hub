import { EventBridgeEvent } from 'aws-lambda';
import {
  indexResearchOutputByTeamHandler,
  SquidexWebhookTeamPayload,
} from '../../../src/handlers/teams/index-handler';
import { TeamsEventType } from '../../../src/handlers/webhooks/webhook-teams';
import { createEventBridgeEventMock } from '../../helpers/events';
import {
  algoliaClientMock,
  algoliaIndexMock,
} from '../../mocks/algolia-client.mock';
import { getResearchOutputResponse } from '../../fixtures/research-output.fixtures';
import { researchOutputControllerMock } from '../../mocks/research-outputs-controller.mock';

describe('Team Research Outputs Index', () => {
  const indexHandler = indexResearchOutputByTeamHandler(
    researchOutputControllerMock,
    algoliaClientMock,
  );

  afterEach(() => jest.clearAllMocks());

  test('Should fetch every research output and create a record on Algolia', async () => {
    const outputs = [
      { ...getResearchOutputResponse(), id: 'research-outputs-1' },
      { ...getResearchOutputResponse(), id: 'research-outputs-2' },
      { ...getResearchOutputResponse(), id: 'research-outputs-3' },
    ];

    researchOutputControllerMock.fetchById.mockResolvedValueOnce(outputs[0]);
    researchOutputControllerMock.fetchById.mockRejectedValue(new Error());
    researchOutputControllerMock.fetchById.mockResolvedValueOnce(outputs[2]);

    const updateEvent = getEvent();

    updateEvent.detail.payload = {
      ...updateEvent.detail.payload,
      data: { outputs: { iv: outputs.slice(0, 2).map(({ id }) => id) } },
      dataOld: { outputs: { iv: [outputs[2].id] } },
    };

    await indexHandler(updateEvent);

    expect(algoliaIndexMock.saveObject).toHaveBeenCalledWith({
      ...outputs[0],
      objectID: outputs[0].id,
    });
    expect(algoliaIndexMock.saveObject).not.toHaveBeenCalledWith({
      ...outputs[1],
      objectID: outputs[1].id,
    });
    expect(algoliaIndexMock.saveObject).toHaveBeenCalledWith({
      ...outputs[2],
      objectID: outputs[2].id,
    });
  });

  test('Should not trigger algolia save when there are no research outputs associated with the team', async () => {
    const updateEvent = getEvent();
    updateEvent.detail.payload = {
      ...updateEvent.detail.payload,
      data: {
        outputs: { iv: [] },
      },
      dataOld: {
        outputs: { iv: [] },
      },
    };

    await indexHandler(updateEvent);
    expect(algoliaIndexMock.saveObject).not.toHaveBeenCalled();
  });
});

const getEvent = (): EventBridgeEvent<
  TeamsEventType,
  SquidexWebhookTeamPayload
> =>
  createEventBridgeEventMock(createTeamSquidexWebhookPayload, 'TeamsCreated');

const createTeamSquidexWebhookPayload: SquidexWebhookTeamPayload = {
  type: 'TeamsCreated',
  payload: {
    $type: 'EnrichedContentEvent',
    type: 'Created',
    id: '0ecccf93-bd06-9821-90ea-783h7te652d',
    data: {
      outputs: {
        iv: [],
      },
    },
    dataOld: {
      outputs: {
        iv: [],
      },
    },
  },
};