export default (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      return { ...state, authData: action.data };
    case "LOGOUT":
      return { ...state, authData: null };
    default:
      return state;
  }
};
