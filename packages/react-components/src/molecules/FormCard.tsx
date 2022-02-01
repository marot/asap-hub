<<<<<<< HEAD
<<<<<<< HEAD
import { css } from '@emotion/react';
import { Card, Headline3 } from '../atoms';
=======
import { Card, Headline2 } from '../atoms';
>>>>>>> Rebase
=======
import { Card, Headline2 } from '../atoms';
>>>>>>> rebase
import { paddingStyles } from '../card';
import { steel } from '../colors';

interface FormCardProps {
  title: string;
}

<<<<<<< HEAD
<<<<<<< HEAD
const dividerStyles = css({
  margin: 0,
});

const FormCard: React.FC<FormCardProps> = ({ children, title }) => (
  <Card padding={false}>
    <div role="presentation" css={[paddingStyles]}>
      <Headline3>{title}</Headline3>
    </div>
    <hr color={steel.hex} css={[dividerStyles]} />
=======
=======
>>>>>>> rebase
const FormCard: React.FC<FormCardProps> = ({ children, title }) => (
  <Card padding={false}>
    <div role="presentation" css={[paddingStyles]}>
      <Headline2>{title}</Headline2>
    </div>
    <hr color={steel.hex} />
<<<<<<< HEAD
>>>>>>> Rebase
=======
>>>>>>> rebase
    <div css={[paddingStyles]}>{children}</div>
  </Card>
);

export default FormCard;
