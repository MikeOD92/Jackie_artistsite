import { combineReducers } from "redux";
import siteDataReducer from "./siteDataReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  user: userReducer,
  siteData: siteDataReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
