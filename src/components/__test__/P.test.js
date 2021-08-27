import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../ContactForm';


test('should check if the page rendered as it should be-contact form', async () => {
  render(<ContactForm />);
  const contactFormSentence = screen.getByText(/Please Contact Us/i);
  expect(contactFormSentence).toBeInTheDocument();
});


describe("handleNameChange", () => {
test('should render input element:name', async () => {
    render(<ContactForm
         
         />);
    const inputElement = screen.getByPlaceholderText(/Name/i);
    
    fireEvent.change(inputElement, { target: { value: "John Doe"}})
    expect(inputElement.value).toBe("John Doe");
  });
})

describe("handleEmailChange", () => {
    test('should render input element:email', async () => {
        render(<ContactForm
             
             />);
        const inputElement = screen.getByPlaceholderText(/Email/i);
        
        fireEvent.change(inputElement, { target: { value: "John@Doe.com"}})
        expect(inputElement.value).toBe("John@Doe.com");
      });
    })

    describe("handleMessageChange", () => {
        test('should render input element:message', async () => {
            render(<ContactForm
                 
                 />);
            const inputElement = screen.getByPlaceholderText(/Message/i);
            
            fireEvent.change(inputElement, { target: { value: "Just a mock message"}})
            expect(inputElement.value).toBe("Just a mock message");
          });
        })
    
        describe("handleSubmit", () => {
            test('should submit values when submit button clicked', async () => {
                render(<ContactForm
                     
                     />);
                const inputElementMessage = screen.getByPlaceholderText(/Message/i);
                fireEvent.change(inputElementMessage, { target: { value: "Just a mock message"}})
                //expect(inputElementMessage.value).toBe("Just a mock message");

                const inputElementEmail = screen.getByPlaceholderText(/Email/i);
                fireEvent.change(inputElementEmail, { target: { value: "john@doe"}})
                // expect(inputElementEmail.value).toBe("john@doe");

                const inputElementName = screen.getByPlaceholderText(/Name/i);
                fireEvent.change(inputElementName, { target: { value: "John Doe"}})
                // expect(inputElementName.value).toBe("John Doe");

                const buttonElement = screen.getByRole("button");
                fireEvent.click(buttonElement)
                expect(inputElementName.value).toBe("John Doe");
                expect(inputElementEmail.value).toBe("john@doe");
                expect(inputElementMessage.value).toBe("Just a mock message");
                //testing only name here. is there a way to add "and"??
                //If I could do this test (covering all the steps execpt api) why I did the others? 
                //Maybe I should delete them?
              });
            })
    


// test('should check if the page rendered as it should be-message recieved', async () => {
//     render(<ContactForm />);
//     const messageRecieved = screen.getByText(/Your Message was Recieved!/i);
//     expect(messageRecieved).toBeInTheDocument();
//   });