import { createResearchOutputResponse } from '@asap-hub/fixtures';
import { disable } from '@asap-hub/flags';
import { render } from '@testing-library/react';
import { ComponentProps } from 'react';

import TeamProfileOutputs from '../TeamProfileOutputs';

const baseProps: ComponentProps<typeof TeamProfileOutputs> = {
  outputs: [],
  numberOfItems: 0,
  numberOfPages: 1,
  currentPage: 0,
  renderPageHref: () => '',
  isListView: false,
  cardViewHref: '',
  listViewHref: '',
};
it('renders a coming soon text (REGRESSION)', () => {
  disable('ALGOLIA_RESEARCH_OUTPUTS');
  const { getByText } = render(<TeamProfileOutputs {...baseProps} />);

  expect(getByText(/more\sto\scome/i)).toBeVisible();
  expect(getByText(/research\soutputs/i)).toBeVisible();
});
it('renders output cards (REGRESSION)', () => {
  disable('ALGOLIA_RESEARCH_OUTPUTS');
  const { getAllByRole } = render(
    <TeamProfileOutputs
      {...baseProps}
      outputs={[
        {
          ...createResearchOutputResponse(),
          id: 'uuid-output',
          title: 'Title',
          authors: [],
          teams: [
            {
              id: 'uuid-team',
              displayName: 'Unknown',
            },
          ],
        },
      ]}
      numberOfItems={1}
    />,
  );

  const links = getAllByRole('link');
  expect(links).toHaveLength(2);
  const [titleLink, teamLink] = links;

  expect(titleLink).toHaveTextContent('Title');
  expect(teamLink).toHaveTextContent(/Unknown/);

  expect(titleLink).toHaveAttribute(
    'href',
    expect.stringMatching(/uuid-output$/),
  );
  expect(teamLink).toHaveAttribute('href', expect.stringMatching(/uuid-team$/));
});

it('renders output cards', () => {
  const { getAllByRole, queryByText } = render(
    <TeamProfileOutputs
      {...baseProps}
      outputs={[
        {
          ...createResearchOutputResponse(),
          id: 'uuid-output',
          title: 'Title',
          authors: [],
          teams: [
            {
              id: 'uuid-team',
              displayName: 'Unknown',
            },
          ],
        },
      ]}
      numberOfItems={1}
    />,
  );

  const links = getAllByRole('link');
  expect(links).toHaveLength(2);
  const [titleLink, teamLink] = links;

  expect(titleLink).toHaveTextContent('Title');
  expect(teamLink).toHaveTextContent(/Unknown/);

  expect(titleLink).toHaveAttribute(
    'href',
    expect.stringMatching(/uuid-output$/),
  );
  expect(teamLink).toHaveAttribute('href', expect.stringMatching(/uuid-team$/));

  expect(queryByText(/more\sto\scome/i)).not.toBeInTheDocument();
});
