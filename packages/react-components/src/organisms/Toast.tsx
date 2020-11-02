import React, { ReactNode } from 'react';
import css from '@emotion/css';

import { layoutStyles } from '../text';
import { Paragraph } from '../atoms';
import { crossIcon, alertIcon } from '../icons';
import { perRem, lineHeight } from '../pixels';
import { rose, ember } from '../colors';
import { noop } from '../utils';

const SIDE_PADDING = 24;

const buttonResetStyles = css({
  padding: 0,
  border: 'none',
  backgroundColor: 'unset',
});

const iconStyles = css({
  width: `${lineHeight / perRem}em`,
  height: `${lineHeight / perRem}em`,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
const alignIconWithParagraphStyles = css({
  marginTop: layoutStyles.marginTop,
});

const styles = css({
  boxSizing: 'border-box',
  width: '100%',
  padding: `${12 / perRem}em ${SIDE_PADDING / perRem}em`,
  position: 'relative',

  backgroundColor: rose.rgb,
  color: ember.rgb,
});

const alertIconStyles = css(iconStyles, alignIconWithParagraphStyles, {
  marginRight: `${12 / perRem}em`,
});
const crossIconStyles = css(iconStyles, alignIconWithParagraphStyles, {
  position: 'absolute',
  right: SIDE_PADDING, // right is from border box, not content box

  cursor: 'pointer',
  svg: { stroke: ember.rgb },
});
const crossPlaceholderStyles = css(iconStyles, {
  display: 'inline-block',
  height: 0,
  paddingTop: 0,
  paddingBottom: 0,

  marginLeft: `${12 / perRem}em`,
});

const wrapStyles = css({
  display: 'flex',
  flexWrap: 'wrap',
});

interface ToastProps {
  children: ReactNode;
  onClose?: () => void;
}
const Toast: React.FC<ToastProps> = ({ children, onClose = noop }) => (
  <section css={styles}>
    <button onClick={onClose} css={[buttonResetStyles, crossIconStyles]}>
      {crossIcon}
    </button>
    <div css={wrapStyles}>
      <div css={alertIconStyles}>{alertIcon}</div>
      <div css={wrapStyles}>
        <Paragraph>{children}</Paragraph>
        <span css={crossPlaceholderStyles}> </span>
      </div>
    </div>
  </section>
);

export default Toast;
