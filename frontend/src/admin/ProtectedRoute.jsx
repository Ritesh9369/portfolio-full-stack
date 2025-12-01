import { Navigate } from "react-router-dom";
import "./Admin.css";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("admintoken");
  return token ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
