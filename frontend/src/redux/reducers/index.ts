import { combineReducers } from "redux";
import artworkListReducer from "./artworkListReducer";
import siteDataReducer from "./siteDataReducer";
import userReducer from "./userReducer";
import createUserReducer from "./createUserReducer";
import updatePasswordReducer from "./passwordUpdateReducer";

const reducers = combineReducers({
  user: userReducer,
  register: createUserReducer,
  update: updatePasswordReducer,
  siteData: siteDataReducer,
  artworkList: artworkListReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
