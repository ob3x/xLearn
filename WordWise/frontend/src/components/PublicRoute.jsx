import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated }) => {
  return !isAuthenticated ? <Outlet /> : <Navigate to="/panel" replace />;
};

export default PublicRoute;
