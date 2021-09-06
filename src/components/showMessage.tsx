import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import restaurantApi from "../api/restaurantApi";
import Contact from "../models/Contact";
import ErrorResponse from "../models/ErrorResponse";

type detailParams = {
  id: string;
};

const initialContact: Contact = {
  Email: "",
  Message: "",
  Name: "",
  IsRead: false
};

export const ShowMessage = () => {
  const { id } = useParams<detailParams>();
  const [contactDetail, setContactDetail] = useState(initialContact);

  const messageDetail = async () => {
    let res = await restaurantApi.get<Contact | null>(`/contact/${id}`);
    let selectedContact = res.data as Contact;
    setContactDetail(selectedContact);
    console.log(selectedContact);
  };

  const setReadMessage = async () => {
    setContactDetail({
      ...contactDetail, IsRead: true })
      await restaurantApi.put<Contact | ErrorResponse>("/contact", {
        data: contactDetail,
      })
  }

  useEffect(() => {
    messageDetail();
    setReadMessage();
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
          From: {contactDetail.Name}
          <i className="fas fa-angle-left arrow"></i>{contactDetail.Email}
          <i className="fas fa-angle-right arrow"></i>
        </p>
        <p>Message: </p>
        <p className="text-box">{contactDetail.Message}</p>
        <p>{contactDetail.IsRead}</p>
      </div>
    </div>
  );
};
