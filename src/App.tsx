import React from 'react';
import './App.css';
import { AdminPage } from './components/AdminPage';
import { NotFound } from './components/NotFound';


function App() {
  return (
    <div className="App">
      <AdminPage/>
      {/* <NotFound/> */}
    </div>
  );
}

export default App;
