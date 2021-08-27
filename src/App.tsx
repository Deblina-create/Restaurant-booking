import React from 'react';
import './App.css';
import { AdminPage } from './components/AdminPage';
import { NotFound } from './components/NotFound';
import ContactForm from './components/ContactForm';
import { Route, Switch } from 'react-router-dom';
import BookingConfirmation from './components/BookingConfirmation';
import MyBookingSearch from './components/MyBookingSearch';



function App() {
  return (
    <div className="App">
      <AdminPage/>
      {/* <NotFound/> */}
      <Switch>
        <Route exact path="/" component={MyBookingSearch} />
        <Route exact path="/search" component={MyBookingSearch} />
        <Route exact path="/confirmation" component={BookingConfirmation} />
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/contact" component={ContactForm} />
        <Route exact path="/*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
