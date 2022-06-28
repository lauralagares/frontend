import { useContext } from "react";
import { authContext } from "../context/auth.context";
import { useLocation, Navigate } from "react-router-dom";

function RequireAuth({ children }) {
    const {token} =  useContext(authContext);
    const location = useLocation();
  
    if (!token) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return children;
  }

  export default RequireAuth;