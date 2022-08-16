import { combineReducers } from "redux";
import artworkListReducer from "./artworkListReducer";
import siteDataReducer from "./siteDataReducer";
import userReducer from "./userReducer";
import createUserReducer from "./createUserReducer";
import updatePasswordReducer from "./passwordUpdateReducer";
import uploadReducer from "./uploadReducer";
import mediaStateReducer from "./mediaReducer";
import SingleArtworkReducer from "./singleArtworkReducer";

const reducers = combineReducers({
  user: userReducer,
  register: createUserReducer,
  update: updatePasswordReducer,
  siteData: siteDataReducer,
  artworkList: artworkListReducer,
  singleArtwork: SingleArtworkReducer,
  upload: uploadReducer,
  media: mediaStateReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
