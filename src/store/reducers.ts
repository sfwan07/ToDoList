import { combineReducers } from "@reduxjs/toolkit";

import Groups from "./groups/reducer";

import Users from "./users/reducer";

import Common from "./common/reducer";

const rootReducer = combineReducers({
  Groups,
  Users,
  Common,
});

export default rootReducer;
