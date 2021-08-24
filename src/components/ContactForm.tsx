import { useEffect, useState } from "react";
import "./contactForm.css";
export const ContactForm=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [message,setMessage]=useState("");


    function handleNameChange(event: any){
        setName(event.target.value);
    }
    function handleEmailChange(event: any){
        setEmail(event.target.value);
    }
    function handleMessageChange(event: any){
        setMessage(event.target.value);
    }
    return (
    <div id="contact-container">
        
        <p>Please Contact Us Using the Form Below</p>
        <form>
        <div><input type="text" value={name} placeholder="Name" onChange={handleNameChange}/></div>
        
        <div><input type="text" value={email} placeholder="Email" onChange={handleEmailChange}/></div>
        
        <div><input type="text" value={message }placeholder="Message" onChange={handleMessageChange}/></div>

        <button>Send</button>
        </form>
    </div>);
}