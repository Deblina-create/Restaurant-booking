import axios from "axios";
import React, { useState } from "react";
import restaurantApi from "../api/restaurantApi";
import ContactForm from "../components/ContactForm";
//import { MsgRecievedModal } from "../modals/MsgRecievedModal";

const ContactPage = () => {
  const [isSent, setIsSent] = useState(false);
  //const [showMsgRec, setShowEdit] = useState(true);

  //SEND MAIL???
  const sendMail = (payload: any) => {
    restaurantApi
      .post("/contact", { data: payload })
      .catch((error) => console.log(error))
      .then((response) => {
        if (response) {
          setIsSent(true);
          console.log(response);
        }
      });
  };

  console.log("The function: ", sendMail);

  return isSent ? (
    <div>
      {/* <MsgRecievedModal onClose={() => setShowEdit(false)} show={showMsgRec}/> */}
      <p>Booking detail</p>
    </div>
  ) : (
    <ContactForm post={sendMail} setIsSent={setIsSent} />
  );
};

export default ContactPage;
