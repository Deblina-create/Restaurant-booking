import React from 'react';
import './App.css';
import { AdmingPage } from './components/AdminPage';
import { Route, Switch } from 'react-router-dom';
import BookingConfirmation from './components/BookingConfirmation';
import MyBookingSearch from './components/MyBookingSearch';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MyBookingSearch} />
        <Route exact path="/search" component={MyBookingSearch} />
        <Route exact path="/confirmation" component={BookingConfirmation} />
        <Route exact path="/admin" component={AdmingPage} />
      </Switch>
    </div>
  );
}

export default App;
