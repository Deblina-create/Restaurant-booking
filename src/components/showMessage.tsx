import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import restaurantApi from "../api/restaurantApi";
import Contact from "../models/Contact";

type detailParams = {
  id: string;
};

const initialContact: Contact = {
  Email: "",
  Message: "",
  Name: "",
};

export const ShowMessage = () => {
  const { id } = useParams<detailParams>();
  const [contactdetail, setContactDetail] = useState(initialContact);

  const readMoreMessage = async () => {
    let res = await restaurantApi.get<Contact | null>(`/contact/${id}`);
    let selectedContact = res.data as Contact;
    setContactDetail(selectedContact);
    console.log(selectedContact);
  };

  useEffect(() => {
    readMoreMessage();
  }, []);

  return (
    <div className="container">
      <div className="back">
        <a href={"/message"}>
          <i className="fas fa-chevron-left"></i> Message detail
        </a>
      </div>
      <div className="detail">
        <p>
          From: {contactdetail.Name}
          <i className="fas fa-angle-left"></i> {contactdetail.Email}
          <i className="fas fa-angle-right"></i>
        </p>
        <p>Message: </p>
        <p className="text-box">{contactdetail.Message}</p>
      </div>
    </div>
  );
};
