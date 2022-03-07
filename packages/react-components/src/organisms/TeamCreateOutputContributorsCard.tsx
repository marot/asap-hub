import { ComponentPropsWithRef } from 'react';

import { FormCard, LabeledMultiSelect } from '../molecules';

type TeamCreateOutputContributorsProps = {
  getLabSuggestions: NonNullable<
    ComponentPropsWithRef<typeof LabeledMultiSelect>['loadOptions']
  >;
  readonly labs: ComponentPropsWithRef<typeof LabeledMultiSelect>['values'];
  readonly onChangeLabs: ComponentPropsWithRef<
    typeof LabeledMultiSelect
  >['onChange'];

  getTeamSuggestions: NonNullable<
    ComponentPropsWithRef<typeof LabeledMultiSelect>['loadOptions']
  >;
  readonly teams: ComponentPropsWithRef<typeof LabeledMultiSelect>['values'];
  readonly onChangeTeams: ComponentPropsWithRef<
    typeof LabeledMultiSelect
  >['onChange'];

  readonly isSaving: boolean;
};

const TeamCreateOutputContributorsCard: React.FC<TeamCreateOutputContributorsProps> =
  ({
    onChangeLabs,
    labs,
    getLabSuggestions,
    getTeamSuggestions,
    onChangeTeams,
    teams,
    isSaving,
  }) => (
    <FormCard title="Who were the contributors?">
      <LabeledMultiSelect
        title="Teams"
        description="Add other teams that contributed to this output. Those teams will also then be able to edit."
        subtitle="(required)"
        enabled={!isSaving}
        placeholder="Start typing..."
        loadOptions={getTeamSuggestions}
        onChange={onChangeTeams}
        values={teams}
        noOptionsMessage={({ inputValue }) =>
          `Sorry, no teams match ${inputValue}`
        }
      />
      <LabeledMultiSelect
        title="Labs"
        description="Add labs that contributed to this output. Only labs whose PI is part of the CRN will appear."
        subtitle="(optional)"
        enabled={!isSaving}
        placeholder="Start typing..."
        loadOptions={getLabSuggestions}
        onChange={onChangeLabs}
        values={labs}
        noOptionsMessage={({ inputValue }) =>
          `Sorry, no labs match ${inputValue}`
        }
      />
    </FormCard>
  );
export default TeamCreateOutputContributorsCard;
