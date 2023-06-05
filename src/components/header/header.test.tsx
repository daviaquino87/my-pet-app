import { render, screen } from '@testing-library/react';
import { HeaderApp } from '.';

test('render HeaderApp correctly', () => {
  render(
    <HeaderApp
      actions={<button>action</button>}
      logo={<span>logo</span>}
      user={<span>user</span>}
    />
  );
  expect(screen.getByRole('button', { name: 'action' })).toBeInTheDocument();
  expect(screen.getByText('logo')).toBeInTheDocument();
  expect(screen.getByText('user')).toBeInTheDocument();
});
