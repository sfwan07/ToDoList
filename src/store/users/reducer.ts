import {
  LOGIN,
  USERS_ADD,
  USERS_EDIT,
  USERS_ENABLE,
  USERS_REMOVE,
} from "./actionType";
import { Profile, UserModel } from "./model";

const initState: { all: Profile[]; selectUser?: Profile } = {
  all: [
    {
      id: 1,
      userName: "admin",
      name: "Admin",
      password: "123",
      role: "admin",
      status: true,
    },
    {
      id: 2,
      userName: "guest",
      name: "Normal User",
      password: "123",
      role: "user",
      status: true,
    },
  ],
  selectUser: undefined,
};

const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case LOGIN:
      var data = state.all.find(
        user =>
          user.userName == action.payload.userName &&
          user.password == action.payload.password &&
          user.status,
      );
      if (data) {
        localStorage.setItem("profile", JSON.stringify(data));
        action.callBack("Done");
      } else action.callBack(null, "Error");
      break;

    case USERS_ADD:
      var users = state.all;
      if (users.find(i => i.userName == action.payload.userName)) {
        action.callBack(null, "Error");
      } else {
        users.push({
          ...action.payload,
          id: new Date(Date.now()).getMilliseconds(),
          status: false,
        });
        state.all = users;
        action.callBack("Done");
      }
      return { ...state };

    case USERS_EDIT:
      var users = state.all;
      var index = users.findIndex(i => i.id == action.payload.id);
      if (
        users.find(
          i =>
            i.id != action.payload.id && i.userName == action.payload.userName,
        )
      ) {
        action.callBack(null, "Error");
      } else {
        if (index >= 0) {
          users[index] = { ...action.payload };
          state.all = users;
          action.callBack("Done");
        } else action.callBack(null, "Error");
      }
      return { ...state };

    case USERS_REMOVE:
      var users = state.all;
      var index = users.findIndex(i => i.id == action.payload);
      if (index >= 0) {
        delete users[index];
        state.all = users;
        action.callBack("Done");
      } else {
        action.callBack(undefined, "Error");
      }
      return { ...state };

    case USERS_ENABLE:
      var users = state.all;
      var index = users.findIndex(i => i.id == action.payload);
      if (index >= 0) {
        users[index].status = !users[index].status;
        state.all = users;
        action.callBack("Done");
      } else {
        action.callBack(undefined, "Error");
      }
      return { ...state };
    default:
      return state;
  }
  return state;
};

export default reducer;
