import React from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import { Route, Switch } from 'react-router-dom';
import MyBookingSearch from './components/MyBookingSearch';
import BookingDelete from './components/BookingDelete';
import { AdminPage } from './components/AdminPage';
import { NotFound } from './components/NotFound';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MyBookingSearch} />
        <Route exact path="/search" component={MyBookingSearch} />
        <Route exact path="/contact" component={ContactForm} />
        <Route exact path="/cancel/:id" component={BookingDelete} />
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/contact" component={ContactForm} />
        <Route exact path="/*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
