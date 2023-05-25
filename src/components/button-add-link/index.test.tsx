import { render, screen } from '@testing-library/react';
import { ButtonAddLink } from '.';
import { MemoryRouter } from 'react-router-dom';

test('render button link', () => {
  render(
    <MemoryRouter>
      <ButtonAddLink />
    </MemoryRouter>
  );
  const link = screen.getByRole('link');
  const btn = screen.getByRole('button');

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', '/new');
  expect(btn).toBeInTheDocument();
});
