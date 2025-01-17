import { ComponentProps } from 'react';
import { render } from '@testing-library/react';

import UserProfileResearch from '../UserProfileResearch';

const commonProps: ComponentProps<typeof UserProfileResearch> = {
  firstName: 'Phillip',
  displayName: 'Phillip Winter',
  email: 'test@example.com',
  teams: [],
  expertiseAndResourceTags: [],
  questions: [],
  labs: [],
  role: 'Grantee',
};

it('doesnt renders the role on ASAP when is not ownProfile and doesnt have labs, teams responsabilites or researchInterest', () => {
  const { queryByText } = render(<UserProfileResearch {...commonProps} />);
  expect(queryByText(/role.+asap/i)).not.toBeInTheDocument();
});
it('renders the role on ASAP when is ownProfile and doesnt have labs, teams responsabilites or researchInterest', () => {
  const { queryByText } = render(
    <UserProfileResearch {...commonProps} isOwnProfile={true} />,
  );
  expect(queryByText(/role.+asap/i)).toBeInTheDocument();
});
it('renders the role on ASAP when labs, teams responsabilites or researchInterest are defined', () => {
  const { queryByText, rerender } = render(
    <UserProfileResearch {...commonProps} />,
  );
  expect(queryByText(/role.+asap/i)).not.toBeInTheDocument();
  rerender(
    <UserProfileResearch {...commonProps} labs={[{ id: '1', name: 'Lab' }]} />,
  );
  expect(queryByText(/role.+asap/i)).toBeInTheDocument();
  rerender(
    <UserProfileResearch
      {...commonProps}
      teams={[
        {
          id: '42',
          displayName: 'Team',
          role: 'Lead PI (Core Leadership)',
        },
      ]}
    />,
  );
  expect(queryByText(/role.+asap/i)).toBeInTheDocument();
  rerender(
    <UserProfileResearch
      {...commonProps}
      responsibilities="My responsibilities"
    />,
  );
  expect(queryByText(/role.+asap/i)).toBeInTheDocument();
  rerender(
    <UserProfileResearch
      {...commonProps}
      researchInterests="My research interest"
    />,
  );
  expect(queryByText(/role.+asap/i)).toBeInTheDocument();
});

it('renders the expertiseAndResourceTags list', () => {
  const { getByText } = render(
    <UserProfileResearch
      {...commonProps}
      expertiseAndResourceTags={['Neurological Diseases']}
    />,
  );
  expect(getByText(/expertise/i, { selector: 'h2' })).toBeVisible();
  expect(getByText('Neurological Diseases')).toBeVisible();
});
it('does not render an edit button by default (REGRESSION)', () => {
  const { queryByLabelText } = render(
    <UserProfileResearch
      {...commonProps}
      teams={[
        {
          id: '42',
          displayName: 'Team',
          role: 'Lead PI (Core Leadership)',
        },
      ]}
    />,
  );
  expect(queryByLabelText(/edit/i)).not.toBeInTheDocument();
});

it('does not render an edit button by default', () => {
  const { queryByLabelText } = render(<UserProfileResearch {...commonProps} />);
  expect(queryByLabelText(/edit/i)).not.toBeInTheDocument();
});

it('renders an edit button for the role on the teams', () => {
  const { getByLabelText } = render(
    <UserProfileResearch
      {...commonProps}
      editRoleHref="/edit-role"
      responsibilities="my responsabilites"
    />,
  );
  expect(getByLabelText(/edit.+role/i)).toHaveAttribute('href', '/edit-role');
});

it('renders an edit button for the expertiseAndResourceTags list', () => {
  const { getByLabelText } = render(
    <UserProfileResearch
      {...commonProps}
      editExpertiseAndResourcesHref="/edit-expertise-and-resources"
    />,
  );
  expect(getByLabelText(/edit.+expertise/i)).toHaveAttribute(
    'href',
    '/edit-expertise-and-resources',
  );
});

describe('When the role is not staff', () => {
  const granteeRole = { ...commonProps, role: 'Grantee' as const };
  it('renders opens questions when questions provided', () => {
    const { getByText } = render(
      <UserProfileResearch
        {...granteeRole}
        questions={['What is the meaning of life?']}
      />,
    );
    expect(getByText(/open questions/i)).toBeVisible();
  });
  it('renders an edit button for the questions list', () => {
    const { getByLabelText } = render(
      <UserProfileResearch
        {...granteeRole}
        editQuestionsHref="/edit-questions"
      />,
    );
    expect(getByLabelText(/edit.+question/i)).toHaveAttribute(
      'href',
      '/edit-questions',
    );
  });
  it('create mailto for email when contactEmail not present', () => {
    const { getByText } = render(
      <UserProfileResearch {...granteeRole} email="email@example.com" />,
    );
    expect(getByText(/contact/i).closest('a')).toHaveAttribute(
      'href',
      'mailto:email@example.com',
    );
  });

  it('create mailto for contactEmail', () => {
    const { getByText } = render(
      <UserProfileResearch
        {...granteeRole}
        email="email@example.com"
        contactEmail="contactEmail@example.com"
      />,
    );
    expect(getByText(/contact/i).closest('a')).toHaveAttribute(
      'href',
      'mailto:contactEmail@example.com',
    );
  });
  it('doesnt render contact card if isOwnProfile is true', async () => {
    const { queryByText } = render(
      <UserProfileResearch
        {...granteeRole}
        email="email@example.com"
        contactEmail="contactEmail@example.com"
        isOwnProfile={true}
      />,
    );
    expect(queryByText(/contact/i)).not.toBeInTheDocument();
  });

  it('renders user profile groups card', () => {
    const { getByText } = render(
      <UserProfileResearch
        {...granteeRole}
        userProfileGroupsCard={'UserProfileGroups'}
      />,
    );
    expect(getByText(/userprofilegroups/i)).toBeVisible();
  });
});

describe('When the role is staff', () => {
  const staffRole = { ...commonProps, role: 'Staff' as const };

  it('doesnt renders opens questions even when provided', () => {
    const { queryByText } = render(
      <UserProfileResearch
        {...staffRole}
        questions={['What is the meaning of life?']}
      />,
    );
    expect(queryByText(/open questions/i)).not.toBeInTheDocument();
  });
  it('create mailto for Support email', () => {
    const { getByText } = render(
      <UserProfileResearch
        {...staffRole}
        email="email@example.com"
        contactEmail="contactEmail@example.com"
      />,
    );
    expect(getByText(/contact/i).closest('a')).toHaveAttribute(
      'href',
      'mailto:techsupport@asap.science?subject=ASAP+Hub%3A+Tech+support',
    );
  });
  it('doesnt render contact card if isOwnProfile is true', async () => {
    const { queryByText } = render(
      <UserProfileResearch
        {...staffRole}
        email="email@example.com"
        contactEmail="contactEmail@example.com"
        isOwnProfile={true}
      />,
    );
    expect(queryByText(/contact/i)).not.toBeInTheDocument();
  });
  it('doesnt render user profile groups card', () => {
    const { queryByText } = render(
      <UserProfileResearch
        {...staffRole}
        userProfileGroupsCard={'UserProfileGroups'}
      />,
    );
    expect(queryByText(/userprofilegroups/i)).not.toBeInTheDocument();
  });
});
