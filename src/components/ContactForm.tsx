import { useState } from "react";
import "./contactForm.css";
import restaurantApi from "../api/restaurantApi";

interface ContactFormProps {
  setIsSent?: any;
}

const ContactForm = (props: ContactFormProps) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  function handleNameChange(event: any) {
    setName (event.target.value);
  }
  
  function handleEmailChange (event: any) {
    setEmail (event.target.value);
  }
  
  function handleMessageChange (event: any) {
    setMessage (event.target.value);
  }


  function handleSubmit() {
    const payload = {
      name,
      email,
      message,
    };

   restaurantApi.post("/contact", { data: payload })
      .catch((error) => console.log(error))
      .then((response) => {
        if (response) {
          props.setIsSent(true);
          console.log(response);
        }
    });
  }
 
  return (
  <div id="contact-container-succes">
    <div id="contact-container">
    <p>Please Contact Us Using the Form Below</p>
      <form onSubmit={handleSubmit}>
          <div><input type="text" value={name} placeholder="Name" required onChange={handleNameChange}/></div>
        
          <div><input type="email" value={email} placeholder="Email" required onChange={handleEmailChange}/></div>
        
          <div><input type="text" value={message} placeholder="Message" required onChange={handleMessageChange}/></div>
 
          <button type="submit">Send</button>
          
     </form>
  </div>
  
  </div>);
 
}
 
 
export default ContactForm