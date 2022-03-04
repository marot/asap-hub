import { waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import TeamCreateOutputContributorsCard from '../TeamCreateOutputContributorsCard';

const props: ComponentProps<typeof TeamCreateOutputContributorsCard> = {
  getLabSuggestions: jest.fn(),
  getTeamSuggestions: jest.fn(),
  onChangeLabs: jest.fn(),
  onChangeTeams: jest.fn(),
  labs: [],
  teams: [],
  isSaving: false,
};

describe('Labs Multiselect', () => {
  it('should render provided values', () => {
    const { getByText } = render(
      <TeamCreateOutputContributorsCard
        {...props}
        labs={[
          { label: 'One Lab', value: '1' },
          { label: 'Two Lab', value: '2' },
        ]}
      />,
    );
    expect(getByText(/one lab/i)).toBeVisible();
    expect(getByText(/two lab/i)).toBeVisible();
  });
  it('should be able to select from the list of options', async () => {
    const loadOptions = jest.fn();
    loadOptions.mockResolvedValue([
      { label: 'One Lab', value: '1' },
      { label: 'Two Lab', value: '2' },
    ]);

    const { getByText, getByLabelText, queryByText } = render(
      <TeamCreateOutputContributorsCard
        {...props}
        getLabSuggestions={loadOptions}
      />,
    );
    userEvent.click(getByLabelText(/Labs/i));
    await waitFor(() =>
      expect(queryByText(/loading/i)).not.toBeInTheDocument(),
    );
    userEvent.click(getByText('One Lab'));
    expect(props.onChangeLabs).toHaveBeenCalledWith([
      { label: 'One Lab', value: '1' },
    ]);
  });
  it('should render message when there is no match', async () => {
    const loadOptions = jest.fn();
    loadOptions.mockResolvedValue([]);
    const { getByLabelText, queryByText } = render(
      <TeamCreateOutputContributorsCard
        {...props}
        getLabSuggestions={loadOptions}
      />,
    );
    userEvent.click(getByLabelText(/Labs/i));
    await waitFor(() =>
      expect(queryByText(/loading/i)).not.toBeInTheDocument(),
    );
    expect(queryByText(/no labs match/i)).toBeInTheDocument();
  });
});

describe('Teams Multiselect', () => {
  it('should render provided values', () => {
    const { getByText } = render(
      <TeamCreateOutputContributorsCard
        {...props}
        teams={[
          { label: 'One Team', value: '1' },
          { label: 'Two Team', value: '2' },
        ]}
      />,
    );
    expect(getByText(/one team/i)).toBeVisible();
    expect(getByText(/two team/i)).toBeVisible();
  });
  it('should be able to select from the list of options', async () => {
    const loadOptions = jest.fn();
    loadOptions.mockResolvedValue([
      { label: 'One Team', value: '1' },
      { label: 'Two Team', value: '2' },
    ]);

    const { getByText, getByLabelText, queryByText } = render(
      <TeamCreateOutputContributorsCard
        {...props}
        getLabSuggestions={loadOptions}
      />,
    );
    userEvent.click(getByLabelText(/Labs/i));
    await waitFor(() =>
      expect(queryByText(/loading/i)).not.toBeInTheDocument(),
    );
    userEvent.click(getByText('One Team'));
    expect(props.onChangeLabs).toHaveBeenCalledWith([
      { label: 'One Team', value: '1' },
    ]);
  });
  it('should render message when there is no match', async () => {
    const loadOptions = jest.fn();
    loadOptions.mockResolvedValue([]);
    const { getByLabelText, queryByText } = render(
      <TeamCreateOutputContributorsCard
        {...props}
        getTeamSuggestions={loadOptions}
      />,
    );
    userEvent.click(getByLabelText(/Teams/i));
    await waitFor(() =>
      expect(queryByText(/loading/i)).not.toBeInTheDocument(),
    );
    expect(queryByText(/no teams match/i)).toBeInTheDocument();
  });
});
