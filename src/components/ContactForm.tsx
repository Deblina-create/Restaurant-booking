import { useState } from "react";
import "./contactForm.css";



interface ContactFormProps {
  setIsSent?: any;
  post(payload: any): any;
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


  async function handleSubmit() {
    const payload = {
      Name: name,
      Email: email,
      Message: message,
    };


    props.post(payload);
    

  }
  

  return (
  
    <div id="contact-container">
    <p>Please Contact Us Using the Form Below</p>
      <form >
          <div><input type="text" value={name} placeholder="Name" required onChange={handleNameChange}/></div>
        
          <div><input type="email" value={email} placeholder="Email" required onChange={handleEmailChange}/></div>
        
          <div><input type="text" value={message} placeholder="Message" required onChange={handleMessageChange}/></div>
 
          <button type="button" onClick={handleSubmit}>Send</button>
          
          
     </form>
  </div>
  
  );
  
 
}
 
export default ContactForm