import axios from "axios";
import React, { useState } from "react";
import restaurantApi from "../api/restaurantApi";
import ContactForm from "../components/ContactForm";
import ErrorResponse from "../models/ErrorResponse";
//import { MsgRecievedModal } from "../modals/MsgRecievedModal";

const ContactPage = () => {
  const [isSent, setIsSent] = useState(false);
  //const [showMsgRec, setShowEdit] = useState(true);

  //SEND MAIL???
  const sendMail = (payload: any) => {
    restaurantApi
      .post<string | ErrorResponse>("/contact", { data: payload })
      .catch((error) => console.log("Error",error))
      .then((response) => {
        if (response) {
          setIsSent(true);
          console.log("Response data",response.data);
        }
      });
  };


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
