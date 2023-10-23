import {Navigate, Outlet} from 'react-router-dom';
import {useAuthStatus} from '../hooks/useAuthStatus.js';
import {Spinner} from 'flowbite-react';

const PrivateRoute = () => {
  const {loggedIn, checkingStatus} = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
