import Contact from '../models/Contact';
import firebase from '../firebase';
import ErrorResponse from '../models/ErrorResponse';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'deblina4.se@gmail.com',
        pass: 'frontend@2020',
    },
});

const saveContact = async (contact: Contact): Promise<string | ErrorResponse> => {
    let error: ErrorResponse = {
        Code: "",
        Message: ""
    };


    const doc = await firebase.db.collection("ContactDetails").add({ Email: contact.Email, Message: contact.Message, Name: contact.Name });

    console.log(doc.id);
    if (doc && doc.id) {
        const html = `
        <div>
            <p>We have received your message. We will take necessary actions.</p>
        </div>
        `;
        sendMail(contact.Email, "Your message received", "Your message received", html);
        return doc.id;
    }
    error = {
        Code: "ERROR_SAVE_CONTACT",
        Message: "An error has occured while saving your message!"
    };
    return error;
}
const getContactData = async (contact: Contact): Promise<Contact[] | null> => {
    const snapshot = await firebase.db.collection("ContactDetails").get();

    if (snapshot && snapshot.docs) {
        const contacts = snapshot.docs.map((doc) => {
            const data = doc.data() as Contact;
            const contact: Contact = {
                ...data, id: doc.id
            }
            return contact;
        });
        return contacts;
    }
    return null;
};

const getContactDetailById = async (id: string): Promise<Contact | null> => {

    try {
        const doc = await firebase.db.collection("ContactDetails").doc(id).get();
        const contact = doc.data() as Contact;
        contact.id = doc.id;
        return contact;
    }
    catch (err: any) {
        console.log(err);
    }
    return null;
}

const sendMail = (to: string, subject: string, text: string, html: string) => {
    transporter.sendMail({
        from: '"Team Restaurant" <deblina4.se@gmail.com>', // sender address
        to: to,
        subject: subject,
        text: text,
        html: html
    }).then(info => {
        console.log({ info });
    }).catch(console.error);
}

export default { saveContact, getContactData,  getContactDetailById };

