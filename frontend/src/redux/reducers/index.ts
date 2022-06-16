import { combineReducers } from "redux";
import createUserReducer from "./createUserReducer";
import updatePasswordReducer from "./passwordUpdateReducer";
import userReducer from "./userReducer";
import artworkListReducer from "./artworkListReducer";
import artworkReducer from "./artworkReducer";
import pageDataReducer from "./pageDataReducers";
import uploadReducer from "./uploadReducer";
import mediaStateReducer from "./mediaReducer";

const reducers = combineReducers({
  user: userReducer,
  register: createUserReducer,
  update: updatePasswordReducer,
  artworkList: artworkListReducer,
  artwork: artworkReducer,
  siteData: pageDataReducer,
  upload: uploadReducer,
  media: mediaStateReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
