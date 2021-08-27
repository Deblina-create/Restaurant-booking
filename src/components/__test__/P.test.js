import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../ContactForm';


test('should check if the page rendered as it should be-contact form', async () => {
  render(<ContactForm />);
  const contactFormSentence = screen.getByText(/Please Contact Us/i);
  expect(contactFormSentence).toBeInTheDocument();
});


describe("handleNameChange", () => {
test('should render input element', async () => {
    render(<ContactForm
         
         />);
    const inputElement = screen.getByPlaceholderText(/Name/i);
    
    fireEvent.change(inputElement, { target: { value: "John Doe"}})
    expect(inputElement.value).toBe("John Doe");
  });
})


// test('should check if the page rendered as it should be-message recieved', async () => {
//     render(<ContactForm />);
//     const messageRecieved = screen.getByText(/Your Message was Recieved!/i);
//     expect(messageRecieved).toBeInTheDocument();
//   });