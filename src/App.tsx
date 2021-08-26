import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import MyBookingSearch from './components/MyBookingSearch';

function App() {
  return (
    <div >
      <Switch>
        <Route exact path="/" component={MyBookingSearch} />
        <Route exact path="/search" component={MyBookingSearch} />
      </Switch>
    </div>
  );
}

export default App;
