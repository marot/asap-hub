import { createTeamResponse } from '@asap-hub/fixtures';
import { researchOutputTypes } from '@asap-hub/model';
import { TeamCreateOutputForm } from '@asap-hub/react-components';
import { select } from '@storybook/addon-knobs';
import { StaticRouter } from 'react-router-dom';

export default {
  title: 'Organisms / Team Profile / Team Create Output Form',
  component: TeamCreateOutputForm,
};

export const Normal = () => (
  <StaticRouter>
    <TeamCreateOutputForm
      getTeamSuggestions={() =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve([{ label: 'team name', id: '1' }]);
          }, 1000);
        })
      }
      tagSuggestions={['A53T', 'Activity assay']}
      type={select('type', researchOutputTypes, 'Article')}
      team={createTeamResponse()}
      getLabSuggestions={() =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve([{ label: 'lab name', id: '1' }]);
          }, 1000);
        })
      }
    />
  </StaticRouter>
);
