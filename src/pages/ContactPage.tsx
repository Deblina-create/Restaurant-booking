import React, { useState } from "react";
import ContactForm from "../components/ContactForm";
 
const ContactPage = () => {
  const [isSent, setIsSent] = useState(false);
 
  return (
    isSent ? (
      <div>
        <p>Dear Customer, Your Message was Recieved!</p>
      </div>
    ) : <ContactForm setIsSent={setIsSent} />
  );
};
 
export default ContactPage;