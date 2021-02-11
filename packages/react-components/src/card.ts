import css from '@emotion/css';
import {
  vminLinearCalcClamped,
  mobileScreen,
  tabletScreen,
  vminLinearCalc,
  largeDesktopScreen,
} from './pixels';

export const borderRadius = 6;

export const paddingStyles = css({
  paddingTop: `${vminLinearCalcClamped(
    mobileScreen,
    18,
    tabletScreen,
    24,
    'px',
  )}`,
  paddingRight: `${vminLinearCalc(
    mobileScreen,
    24,
    largeDesktopScreen,
    36,
    'px',
  )}`,
  paddingBottom: `${vminLinearCalcClamped(
    mobileScreen,
    18,
    tabletScreen,
    24,
    'px',
  )}`,
  paddingLeft: `${vminLinearCalc(
    mobileScreen,
    24,
    largeDesktopScreen,
    36,
    'px',
  )}`,
});
