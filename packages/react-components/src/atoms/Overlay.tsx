import React from 'react';
import css from '@emotion/css';

import { charcoal } from '../colors';
import { noop } from '../utils';

const buttonResetStyles = css({
  padding: 0,
  border: 'none',
  outline: 'none',
});
const styles = css({
  width: '100%',
  height: '100%',
  backgroundColor: charcoal.rgb,

  visibility: 'hidden',
  opacity: 0,
  transition: `opacity 250ms linear, visibility 0s 250ms`,
});
const shownStyles = css({
  visibility: 'visible',
  opacity: 0.7,
  transition: `opacity 250ms linear`,
});
interface OverlayProps {
  shown?: boolean;
  onClick?: () => void;
}
const Overlay: React.FC<OverlayProps> = ({ shown = true, onClick = noop }) => (
  <button
    aria-label="Close"
    css={[buttonResetStyles, styles, shown && shownStyles]}
    onClick={onClick}
  />
);

export default Overlay;
