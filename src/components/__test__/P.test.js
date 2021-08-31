import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../ContactForm';
import ContactPage from '../../pages/ContactPage';


// This is the mocked response object from the API with status code 200
const resolvedResponse = {
  status: 200,
};

// This is the mocked response from the API with status code 404
const rejectedResponse = {
  status: 404,
};

test('should check if the page rendered as it should be-contact form', async () => {

    render(<ContactForm />);

    const contactFormSentence = screen.getByText(/Please Contact Us/i);

    expect(contactFormSentence).toBeInTheDocument();
});

describe("handleNameChange", () => {
  test('should render input element:name', async () => {

    render(<ContactForm/>);

    const inputElement = screen.getByPlaceholderText(/Name/i);

    fireEvent.change(inputElement, { target: { value: "John Doe"}})
      
    expect(inputElement.value).toBe("John Doe");
    
  });
})

describe("handleEmailChange", () => {
  test('should render input element:email', async () => {
        
    render(<ContactForm/>);

    const inputElement = screen.getByPlaceholderText(/Email/i);
        
    fireEvent.change(inputElement, { target: { value: "John@doe.com"}})
    
    expect(inputElement.value).toBe("John@doe.com");

  });
})



describe("handleMessageChange", () => {
  test('should render input element:message', async () => {
        
    render(<ContactForm/>);
    
    const inputElement = screen.getByPlaceholderText(/Message/i);
            
    fireEvent.change(inputElement, { target: { value: "Just a mock message"}})
    
    expect(inputElement.value).toBe("Just a mock message");
    });
  })

// describe("postApi", () => {
//   test('should render success message when status === 200', async () => {
  
//     render(<ContactPage />);
  
//     const asyncMock = jest
  
//         .fn()
    
//         .mockResolvedValueOnce(resolvedResponse)
//         //.mockResolvedValue(resolvedResponse)
//         await asyncMock ();
    
//         //const renderedDivElement = screen.getByRole("div");
//         const renderedText = screen.getByText;
//         console.log(renderedText);
//         expect(renderedText.value).toBe("Dear Custormer, Your Message was Recieved!");
//     });

//     test('should render Contact Form when status === 400', async () => {

//       render(<ContactForm/>);
//       const asyncMock = jest
      
//         .fn()
      
//         .mockResolvedValueOnce(rejectedResponse)
      
//         await asyncMock ();
//         //renderedComponent??
//         const renderedDivElement = screen.getByRole("div");
      
//         //expect(renderedDivElement.value).toBe("");
//         expect(renderedDivElement.value).toContain("Please Contact Us Using the Form Below")
//     });
//   })

describe("handleSubmit", () => {
  test('should submit values when submit button clicked', async () => {

        render(<ContactForm/>);
        const inputElementMessage = screen.getByPlaceholderText(/Message/i);
        fireEvent.change(inputElementMessage, { target: { value: "Just a mock message"}})
        //expect(inputElementMessage.value).toBe("Just a mock message");

        const inputElementEmail = screen.getByPlaceholderText(/Email/i);
        fireEvent.change(inputElementEmail, { target: { value: "john@doe.com"}})
      // expect(inputElementEmail.value).toBe("john@doe");

        const inputElementName = screen.getByPlaceholderText(/Name/i);
        fireEvent.change(inputElementName, { target: { value: "John Doe"}})
      // expect(inputElementName.value).toBe("John Doe");

        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement)
        expect(inputElementName.value).toBe("John Doe");
        expect(inputElementEmail.value).toBe("john@doe.com");
        expect(inputElementMessage.value).toBe("Just a mock message");

    });

  })

