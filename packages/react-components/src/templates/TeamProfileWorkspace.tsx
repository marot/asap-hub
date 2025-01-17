import { TeamResponse, TeamTool } from '@asap-hub/model';
import { css } from '@emotion/react';
import { network } from '@asap-hub/routing';

import { Card, Display, Link, Caption, Headline2, Paragraph } from '../atoms';
import { perRem, mobileScreen } from '../pixels';
import { ToolCard } from '../organisms';
import { mailToSupport, createMailTo } from '../mail';
import { formatDateAndTime } from '../date';

const containerStyles = css({
  display: 'grid',
  gridRowGap: `${36 / perRem}em`,
});
const newToolStyles = css({
  gridArea: 'contact',
  display: 'flex',
  [`@media (min-width: ${mobileScreen.max}px)`]: {
    display: 'block',
  },
});
const toolContainerStyles = css({
  listStyle: 'none',
  margin: 0,
  padding: `${24 / perRem}em 0`,

  display: 'grid',
  gridRowGap: `${24 / perRem}em`,
});

type TeamProfileWorkspaceProps = Readonly<
  Pick<TeamResponse, 'id' | 'pointOfContact' | 'lastModifiedDate'>
> & {
  readonly tools: ReadonlyArray<TeamTool>;
  readonly onDeleteTool?: (toolIndex: number) => Promise<void>;
};

const TeamProfileWorkspace: React.FC<TeamProfileWorkspaceProps> = ({
  id,
  pointOfContact,
  lastModifiedDate,

  tools,
  onDeleteTool,
}) => {
  const toolsRoute = network({})
    .teams({})
    .team({ teamId: id })
    .workspace({})
    .tools({});
  return (
    <div css={containerStyles}>
      <Card>
        <Display styleAsHeading={3}>Collaboration Tools (Team Only)</Display>
        <Paragraph accent="lead">
          This directory contains the most important links for your team's
          internally shared resources and what each link is used for.
        </Paragraph>
        {!!tools.length && (
          <ul css={toolContainerStyles}>
            {tools.map((tool, index) => (
              <li key={`tool-${index}`}>
                <ToolCard
                  {...tool}
                  editHref={toolsRoute.tool({ toolIndex: `${index}` }).$}
                  onDelete={onDeleteTool && (() => onDeleteTool(index))}
                />
              </li>
            ))}
          </ul>
        )}
        <div css={newToolStyles}>
          <Link href={toolsRoute.$} buttonStyle>
            <span>Add a new team link</span>
          </Link>
        </div>
        <Caption accent="lead" asParagraph>
          Last edited on {formatDateAndTime(new Date(lastModifiedDate))}
        </Caption>
      </Card>
      {pointOfContact && (
        <Card>
          <Headline2 styleAsHeading={3}>Team Contact Email</Headline2>
          <Paragraph accent="lead">
            Everyone else on the Hub can contact your team via the email address
            of your Project Manager,{' '}
            <Link href={createMailTo(pointOfContact.email)}>
              {pointOfContact.displayName}
            </Link>
            .
          </Paragraph>
          <Paragraph accent="lead">
            To assign a different team member as the Project Manager, please{' '}
            <Link href={mailToSupport()}>contact ASAP support</Link>.
          </Paragraph>
        </Card>
      )}
    </div>
  );
};

export default TeamProfileWorkspace;
