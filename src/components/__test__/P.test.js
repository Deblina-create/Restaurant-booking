import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactForm from '../ContactForm';


test('should render same name entered by the contact form', async () => {
  render(<ContactForm title="tatat"/>);
  const customerNameElement = screen.getByText(/tatat/i);
  expect(customerNameElement).toBeInTheDocument();
});
