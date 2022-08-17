import { combineReducers } from "redux";
<<<<<<< HEAD
import artworkListReducer from "./artworkListReducer";
import siteDataReducer from "./siteDataReducer";
=======
>>>>>>> parent of 9a4e4fa... setting up redux for siteData
import userReducer from "./userReducer";

const reducers = combineReducers({
  user: userReducer,
<<<<<<< HEAD
  siteData: siteDataReducer,
  artworkList: artworkListReducer,
=======
>>>>>>> parent of 9a4e4fa... setting up redux for siteData
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
