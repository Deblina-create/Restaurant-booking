import { useEffect, useState } from "react";
import restaurantApi from "../api/restaurantApi";
import { ReadMoreModal } from "../modals/ReadMoreModal";
import Contact from "../models/Contact";

export const Messages = () => {
  const [contacts, setContacts] = useState([] as Contact[]);
  const [showModal, setShowModal] = useState(false);
  let divTag = contacts.map((contact) => {
    return (
      <div key={contact.id} className="booking-list">
        <div>{contact.Name}</div>
        <div>{contact.Email}</div>
        {contact.Message.length > 10 ? (
          contact.Message.substring(0, 15) + "..."
        ) : (
          <div>{contact.Message}</div>
        )}
        <button onClick={() => {setShowModal(true)}}>Read more</button>
      </div>
    );
  });

  const fetchData = async () => {
    console.log("### Contacts from DB");
    const response = await restaurantApi.post<Contact[]>("/contact", {
      data: [],
    });
    console.log("### Response is ", response);
    setContacts(response.data as Contact[]);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="back">
        <a href={"/admin"}>
          <i className="fas fa-chevron-left"></i> Messages
        </a>
      </div>
      <h2> Messages</h2>
      <div>{divTag}</div>
      <ReadMoreModal onClose={()=> {setShowModal(true)}} show={showModal} contactId={}/>
    </div>
  );
};
