import { useState } from "react";
// import { useHistory } from "react-router";
import "./contactForm.css";
import restaurantApi from "../api/restaurantApi";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // const history = useHistory();

  function handleNameChange(event: any) {
    console.log (event.target);
    setName (event.target.value);
  }
  
  function handleEmailChange (event: any) {
    console.log (event.target);
    setEmail (event.target.value);
  }
  
  function handleMessageChange (event: any) {
    console.log (event.target);
    setMessage (event.target.value);
  }
  
  async function handleSubmit() {
    const payload = {
      name,
      email,
      message,
    };
    await restaurantApi.post("/contact", payload)
      .catch((error) => console.log(error))
      .then((response) => {
        if (response) {
          // history.push("/confirmation");
          console.log(response);
          //If the message is sent succesefully we should present the 
          //"Your Message was sent successfully"
          return (
            <div id="contact-container-succes">
              <p>Your Message was Recieved!</p>
            </div>
          );
        }
      });
  }

  return (
    <div id="contact-container">
      <p>Please Contact Us Using the Form Below</p>
      <form>
        <div><input type="text" value={name} placeholder="Name" onChange={handleNameChange}/></div>
        
        <div><input type="text" value={email} placeholder="Email" onChange={handleEmailChange}/></div>
        
        <div><input type="text" value={message} placeholder="Message" onChange={handleMessageChange}/></div>

        <button type="submit" onSubmit={handleSubmit}>Send</button>
      </form>
    </div>
  );
}

export default ContactForm