import express from 'express';
import Booking from './models/Booking'
import BD from './controllers/BookingDetailsController';
import SearchRequest from './models/SearchRequest';
import cors from 'cors';
import console from 'console';

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(cors());


app.post('/search', async (req, res) => {
    const sr = req.body.data as SearchRequest;
    console.log("req payload", req.body);
    const dbResponse= await BD.searchBookingDetail(sr.BookingDate, sr.PeopleCount);
    return res.json(dbResponse);
});

app.post('/booking',async (req, res) => {
    const bd = req.body.data as Booking;
    console.log("req payload", req.body);
    const dbResponse= await BD.saveBookingDetail(bd);
    return res.json(dbResponse);
});

app.put('/booking', async (req, res) => {
    const bd = req.body.data as Booking;
    const dbResponse= await BD.editBookingDetail(bd);
    return res.json(dbResponse);
});

app.delete('/booking/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const dbResponse= await BD.deleteBookingDetail(id);
    return res.json(dbResponse);
});

app.post('/admin_search', async (req, res) => {
    let date = new Date(req.body.data); 
    const dbResponse= await BD.adminSearchBookings(date);
    return res.json(dbResponse);
});

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  }); 

export default app;