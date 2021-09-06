import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import restaurantApi from "../api/restaurantApi";
import { ReadMoreModal } from "../modals/ReadMoreModal";
import Contact from "../models/Contact";
import ErrorResponse from "../models/ErrorResponse";
import "./Admin.css";

export const Messages = () => {
  const [contacts, setContacts] = useState([] as Contact[]);
  const [selectedContactId, setSelectedContactId] = useState<string>();
  const history = useHistory();
  
  const showMore = (contact: Contact) => {
    history.push("/showmore/" + `${contact.id}`);
  };

  let divTag = contacts.map((contact) => {
    return (
        // <tr  key={contact.id}>
        //   <th>{contact.Name}</th>
        //   <th>{contact.Email}</th>
        //   <th>{contact.Message}</th>
        // </tr>
      <div key={contact.id} className="booking-list">
        <div>{contact.Name}</div>
        <div>{contact.Email}</div>
        {contact.Message.length > 10 ? (
          contact.Message.substring(0, 10) + "..."
        ) : (
          <div>{contact.Message}</div>
        )} 
        <button
          onClick={() => showMore(contact)}
        >
          Read more
        </button>
      </div>
    );
  });

  const fetchData = async () => {
    console.log("### Contacts from DB");
    const response = await restaurantApi.post<Contact[]>("/contact_search", {
      data: contacts,
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
      {/* <table>
        <tr>
          <th>NAME</th>
          <th>CONTACT</th>
          <th>MESSAGE</th>
        </tr> */}
      {/* </table> */}
      <div>{divTag}</div>
      {/* <ReadMoreModal
        onClose={onReadDone}
        show={selectedContactId ? true : false}
        contactId={selectedContactId!}
      /> */}
    </div>
  );
  function onReadDone() {
    setSelectedContactId(undefined);
    fetchData();
  }
};
