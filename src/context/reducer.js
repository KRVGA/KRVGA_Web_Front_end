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
          admn: action.payload.admn,
          superadmn: action.payload.superadmn,
          email: action.payload.email,
          user_id: action.payload.user_id,
          life_member_update: action.payload.life_member_update
            ? action.payload.life_member_update
            : false,
          membership_info: action.payload.membership_info,
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
    case 'RESET_ALERTS':
      return {
        ...state,
        user: {...state.user},
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
        user: state.user ? {...state.user} : null,
        isError: true,
        isLoading: false,
        message: action.payload,
      };
    case 'SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          life_member_update: false,
          membership_info: action.payload.user_membership_info,
        },
        isError: false,
        isLoading: false,
        message: action.payload.message,
        success: true,
      };
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        isError: false,
        isLoading: false,
        message: action.payload.message,
        success: true,
      };

    default:
      return state;
  }
};

export default reducer;
