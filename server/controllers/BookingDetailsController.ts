import BookingDetail from '../models/BookingDetail'
import firebase from '../firebase'

const saveBookingDetail = async (bookingdetail : BookingDetail): Promise<string | null> =>{
    const doc= await firebase.db.collection("BookingDetails").add(bookingdetail);
    console.log(doc.id);
    if(doc && doc.id){
        return doc.id;
    }
    return null;
}

const editBookingDetail = async (bookingdetail : BookingDetail)=>{
    //TBD
    //await firebase.db.collection("BookingDetails").doc(bookingdetail.id).update(bookingdetail);
}

const deleteBookingDetail = async (id : string)=>{
    //TBD
    //await firebase.db.collection("BookingDetails").doc(id).delete();
}

const searchBookingDetail = async ()=>{
//TBD
}

export default { saveBookingDetail, editBookingDetail, deleteBookingDetail, searchBookingDetail };