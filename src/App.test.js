
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import NewPostPage from './routes/NewPostPage'; 

import { MemoryRouter } from 'react-router-dom';

test('renders NewPostPage component and checks heading text', () => {
  render(
    <MemoryRouter initialEntries={['/newpost']}>
      <NewPostPage />
    </MemoryRouter>
  );
  
 
  const headingText = screen.getByText(/What do you want to Ask or Share\?/i);
  expect(headingText).toBeInTheDocument();
});
