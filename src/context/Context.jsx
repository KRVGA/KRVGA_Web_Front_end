import {createContext, useReducer} from 'react';
import reducer from './reducer.js';

const Context = createContext();

export const ContextProvider = ({children}) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const initialState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    message: '',
    membership_types: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{...state, dispatch}}>{children}</Context.Provider>
  );
};

export default Context;
