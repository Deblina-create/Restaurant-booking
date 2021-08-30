import { Link } from "react-router-dom";
import "./Home.css";
import Table_logo from "./The_Table_logo.png"

export const Home = () => {
  return (
    <div className="home">
      <div className="logo">
        <img src={Table_logo} alt="restaurant-logo" className="logo-img"></img>
      </div>
      <div className="bookingLink">
        <Link to="/booking"><h1 id="bookingLink">BOOK</h1>
        </Link>
        <h1>YOUR TABLE</h1>
      </div>
      <div className="links">
        <div>
          <Link to="/contact">Contact us <i className="fas fa-chevron-down"></i></Link>
        </div>
        <div>
          <Link to="/admin">Admin <i className="fas fa-chevron-down"></i></Link>
        </div>
      </div>
    </div>
  );
};
