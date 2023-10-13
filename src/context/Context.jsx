import {createContext, useReducer} from 'react';
import reducer from './reducer.js';

const Context = createContext();

export const ContextProvider = ({children}) => {
  const ut = JSON.parse(localStorage.getItem('ut'));

  const initialState = {
    ut: ut ? ut : null,
    user: '',
    isError: false,
    isLoading: false,
    message: '',
    membership_types: [],
    guest_purchase: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{...state, dispatch}}>{children}</Context.Provider>
  );
};

export default Context;
