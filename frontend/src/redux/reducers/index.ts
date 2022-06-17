import { combineReducers } from "redux";
import createUserReducer from "./createUserReducer";
import updatePasswordReducer from "./passwordUpdateReducer";
import userReducer from "./userReducer";
import pageDataReducer from "./pageDataReducers";

const reducers = combineReducers({
  user: userReducer,
  register: createUserReducer,
  update: updatePasswordReducer,

  siteData: pageDataReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
