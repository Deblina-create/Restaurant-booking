import { useState } from "react";
import "./contactForm.css";
import restaurantApi from "../api/restaurantApi";
import nodemailer from 'nodemailer';
import { MsgRecievedModal } from "../modals/MsgRecievedModal";
import Utilities from "../Utilities";
//IMPORT

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user: 'deblina4.se@gmail.com',
//       pass: 'frontend@2020',
//   },
// });

interface ContactFormProps {
  setIsSent?: any;
  post(payload: any): any;
}

// const sendMail = (to: string, subject: string, text: string, html: string) => {
//   transporter.sendMail({
//       from: '"Team Restaurant" <deblina4.se@gmail.com>', // sender address
//       to: to,
//       subject: subject,
//       text: text,
//       html: html
//   }).then(info => {
//       console.log({ info });
//   }).catch(console.error);
// }




const ContactForm = (props: ContactFormProps) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showMsgRecievedModal, setShowMsgRecievedModal] = useState(false);

  const [errorName, setErrorName]= useState(false);
  const [errorEmail, setErrorEmail]= useState(false);
  const [errorMessage, setErrorMessage]= useState(false);


  function handleNameChange(event: any) {
    setName (event.target.value);
  }
  
  function handleEmailChange (event: any) {
    setEmail (event.target.value);
  }
  
  function handleMessageChange (event: any) {
    setMessage (event.target.value);
  }

  const validate= () : boolean=>{
    let valid = true;
    if(name === ""){
        setErrorName(true);
        valid = false;
    }
    else{
        setErrorName(false);
    }
    if(!Utilities.validateEmail(email)){
        setErrorEmail(true);
        valid = false;
    }
    else{
        setErrorEmail(false);
    }
    if(message === ""){
      setErrorMessage(true);
      valid = false;
  }
  else{
      setErrorMessage(false);
  }
    return valid;
}
  async function handleSubmit() {
    if(!validate()){
      return
    }
    const payload = {
      name,
      email,
      message,
    };
    
    

    // function show() {
    //   //add here show msg recieved and set the boleeans
    //   //setMsgRe
    //   console.log("modal");
    //   };

    console.log(props.post)

    await props.post(payload);
    //sends data?
    setShowMsgRecievedModal(true)
    

  }
  

  return (
  
    <div id="contact-container">
    <p>Please Contact Us Using the Form Below</p>
      <form >

          {errorName ? <p style={{color : "orange", margin: 0}}>Please enter your name</p> : ''}
          <div><input type="text" value={name} placeholder="Name" required onChange={handleNameChange}/></div>
          {errorEmail ? <p style={{color : "orange", margin: 0}}>Please enter a valid email</p> : ''}
          <div><input type="email" value={email} placeholder="Email" required onChange={handleEmailChange}/></div>
          {errorMessage ? <p style={{color : "orange", margin: 0}}>Please enter a Message</p> : ''}
          <div><input type="text" value={message} placeholder="Message" required onChange={handleMessageChange}/></div>
 
          <button type="button" onClick={handleSubmit}>Send</button>
          
          
     </form>
      
      < MsgRecievedModal onClose={() => setShowMsgRecievedModal(false)} show={showMsgRecievedModal} />
  </div>
  
  );
  
 
}
 
export default ContactForm