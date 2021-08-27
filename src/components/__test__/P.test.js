import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactForm from '../ContactForm';


test('should check if the page rendered as it should be-contact form', async () => {
  render(<ContactForm />);
  const contactFormSentence = screen.getByText(/Please Contact Us/i);
  expect(contactFormSentence).toBeInTheDocument();
});


test('should check if the page rendered as it should be-message recieved', async () => {
    render(<ContactForm />);
    const messageRecieved = screen.getByText(/Your Message was Recieved!/i);
    expect(messageRecieved).toBeInTheDocument();
  });