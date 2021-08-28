import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div style={{width:"90vw", margin:"0 auto"}}>
      <div className="back">
        <Link to={"/"}>
          <i className="fas fa-chevron-left"></i> Home
        </Link>
      </div>
      <h1>Not Found</h1>
      <h1>404</h1>
    </div>
  );
};
