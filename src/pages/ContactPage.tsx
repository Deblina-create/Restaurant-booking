import React, { useState } from "react";
import ContactForm from "../components/ContactForm";
import { MsgRecievedModal } from "../modals/MsgRecievedModal";
 
const ContactPage = () => {
  const [isSent, setIsSent] = useState(false);
  const [showMsgRecieved, setMsgRecieved] = useState(false);
  return (
    isSent ? (
      <div>
        <MsgRecievedModal onClose={() => setMsgRecieved(false)} show={showMsgRecieved} />
      </div>
    ) : <ContactForm setIsSent={setIsSent} />
  );
};
 
export default ContactPage;