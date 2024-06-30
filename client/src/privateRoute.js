import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ user }) => {

  return user ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
