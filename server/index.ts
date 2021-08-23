import express from 'express';
import BookingDetail from './models/BookingDetail'
import BD from './controllers/BookingDetailsController';
const app = express();
const PORT = 8000;
app.use(express.json());


app.get('/search', (req, res) => {
    
});

app.post('/bookingdetail',async (req, res) => {
    const bd = req.body as BookingDetail;
    const x= await BD.saveBookingDetail(bd);
    return res.json(x);
});

app.put('/bookingdetail', (req, res) => {
    
});

app.delete('/bookingdetail', (req, res) => {
    
});


app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });

