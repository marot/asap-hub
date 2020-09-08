import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Overlay from '../Overlay';

it('occupies its entire container', () => {
  const { getByLabelText } = render(<Overlay />);

  expect(getComputedStyle(getByLabelText(/close/i)).width).toBe('100%');
  expect(getComputedStyle(getByLabelText(/close/i)).height).toBe('100%');
});

it('can be hidden', () => {
  const { getByLabelText, rerender } = render(<Overlay />);
  expect(getByLabelText(/close/i)).toBeVisible();

  rerender(<Overlay shown={false} />);
  expect(getByLabelText(/close/i)).not.toBeVisible();
});

it('trigger click events', () => {
  const handleClick = jest.fn();
  const { getByLabelText } = render(<Overlay onClick={handleClick} />);

  userEvent.click(getByLabelText(/close/i));
  expect(handleClick).toHaveBeenCalled();
});
