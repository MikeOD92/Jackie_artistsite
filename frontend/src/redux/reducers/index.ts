import { combineReducers } from "redux";
import artworkListReducer from "./artworkListReducer";
import siteDataReducer from "./siteDataReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  user: userReducer,
  siteData: siteDataReducer,
  artworkList: artworkListReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
