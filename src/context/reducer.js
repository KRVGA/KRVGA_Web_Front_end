const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_REGISTER':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isError: false,
        message: action.payload.message,
      };
    case 'USER_LOGIN':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isError: false,
        message: action.payload.message,
      };
    case 'USER_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          user_email: action.payload.user_email,
          user_info: action.payload.membership_info,
        },
        isLoading: false,
        isError: false,
        message: '',
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
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
        isError: false,
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
    case 'SUCCESS':
      return {
        ...state,
        isError: false,
        isLoading: false,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
