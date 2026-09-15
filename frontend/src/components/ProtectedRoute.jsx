import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

// Wraps routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { token } = useAuthStore();
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
