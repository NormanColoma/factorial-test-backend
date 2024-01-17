import {render, screen} from '@testing-library/react';
import AppBar from './app-bar';

test('app-bar component', () => {
  render(<AppBar />)
  const appBar = screen.getByText(/Factorial Weather/i)
  expect(appBar).toBeInTheDocument()
})
