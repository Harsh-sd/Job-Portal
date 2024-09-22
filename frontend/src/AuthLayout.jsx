import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({children}) {
  const isAuthenticated = useSelector((state) => state.auth.status);
  
  // Log the authentication status to the console
  console.log("Authenticated:", isAuthenticated);

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  //this is for seperate route
  if(children){
    return children
  }

  // Otherwise, render the Outlet for nested routes
  return <Outlet />;
}

export default ProtectedRoute;
