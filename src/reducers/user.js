const INITIAL_STATE = {
  profile: null,
  uid: "jBgyLa8UECY73aDdoX6T78FYxwn1",
  msg: {}
};

const applySetUserInfo = (state, action) => {
  return {
    ...state,
    profile: action.payload
  };
};

const applySetWall = (state, action) => {
  return {
    ...state,
    msg: action.payload
  };
};

const applySetUser = (state, action) => {
  return {
    ...state,
    uid: action.payload
  };
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "USERINFO_SET": {
      return applySetUserInfo(state, action);
    }
    case "USER_SET": {
      return applySetUser(state, action);
    }
    case "WALL_SET": {
      return applySetWall(state, action);
    }
    default:
      return state;
  }
}

export default userReducer;
