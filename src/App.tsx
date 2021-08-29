import React from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import { AdmingPage } from './components/AdminPage';
import { Route, Switch } from 'react-router-dom';
import MyBookingSearch from './components/MyBookingSearch';
import BookingDelete from './components/BookingDelete';
import DeleteConfirmation from './components/DeleteConfirmation';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MyBookingSearch} />
        <Route exact path="/search" component={MyBookingSearch} />
        <Route exact path="/admin" component={AdmingPage} />
        <Route exact path="/contact" component={ContactForm} />
        <Route exact path="/cancel/:id" component={BookingDelete} />
        <Route exact path="/confirmcancel" component={DeleteConfirmation} />
      </Switch>
    </div>
  );
}

export default App;
