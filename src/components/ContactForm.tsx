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
  }
}