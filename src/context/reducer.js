import {capitalizeWord} from '../utils/utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_REGISTER':
      return {
        ...state,
        user: capitalizeWord(action.payload.email),
        isLoading: false,
        isError: false,
        message: action.payload.message,
      };
    case 'USER_LOGIN':
      return {
        ...state,
        user: capitalizeWord(action.payload.email),
        isLoading: false,
        isError: false,
        message: action.payload.message,
      };
    case 'USER_LOGOUT':
      return {
        user: null,
        isLoading: false,
        isError: false,
      };
    case 'GET_MEMB_TYPES':
      return {
        ...state,
        isLoading: false,
        isError: false,
        membership_types: action.payload,
      };
    case 'GUEST_PURCHASE':
      return {
        ...state,
        isLoading: false,
        isError: false,
        guest_purchase: {...action.payload},
      };
    case 'REMOVE_ALERT':
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: '',
      };
    case 'RESET':
      return {
        ...state,
        user: null,
        isError: false,
        isLoading: false,
        message: '',
      };
    case 'ERROR':
      return {
        ...state,
        user: null,
        isError: true,
        isLoading: false,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
