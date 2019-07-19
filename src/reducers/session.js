const INITIAL_STATE = {
  authUser: null,
  authUserData: null
};

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action !== null ? action.uid : null,
  authUserData: action
});

function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "AUTH_USER_SET": {
      return applySetAuthUser(state, action.payload);
    }
    default:
      return state;
  }
}

export default sessionReducer;
