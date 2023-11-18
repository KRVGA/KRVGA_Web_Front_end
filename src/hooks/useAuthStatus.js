import {useState, useEffect, useContext} from 'react';
import Context from '../context/Context';

export const useAuthStatus = () => {
  const {user} = useContext(Context);

  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    if (user?.id) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    setCheckingStatus(false);
  }, [user]);

  return {loggedIn, checkingStatus};
};

export default useAuthStatus;
