import React from 'react';
import { render } from '@testing-library/react';

import Card from '../Card';

it('renders the text in a <p>', () => {
  const { container } = render(<Card>text</Card>);
  expect(container.textContent).toBe('text');
});

it('applies a default border and paper background', () => {
  const { container } = render(<Card>text</Card>);

  expect(container.firstElementChild).toBeDefined();
  const { borderColor, backgroundColor } = getComputedStyle(
    container.firstElementChild as Element,
  );

  expect(borderColor).toMatchInlineSnapshot(`"rgb(237,241,243)"`);
  expect(backgroundColor).toMatchInlineSnapshot(`"rgb(255, 255, 255)"`);
});