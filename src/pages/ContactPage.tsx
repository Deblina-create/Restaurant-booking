import React, { useState } from "react";
import ContactForm from "../components/ContactForm";
import { MsgRecievedModal } from "../modals/MsgRecievedModal";
 
const ContactPage = () => {
  const [isSent, setIsSent] = useState(false);
  const [showMsgRec, setShowEdit] = useState(true);

  return (
    isSent ? (
      <div>
        <MsgRecievedModal onClose={() => setShowEdit(false)} show={showMsgRec}/>
      </div>
    ) : <ContactForm setIsSent={setIsSent} />
  );
};
 
export default ContactPage;