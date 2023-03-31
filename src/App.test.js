import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Gas Prices title', () => {
  render(<App />);
  const titleText = screen.getByText(/Gas Prices/i);
  expect(titleText).toBeInTheDocument();
});
