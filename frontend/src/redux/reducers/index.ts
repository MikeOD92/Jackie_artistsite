import { combineReducers } from "redux";
import createUserReducer from "./createUserReducer";
import updatePasswordReducer from "./passwordUpdateReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  user: userReducer,
  register: createUserReducer,
  update: updatePasswordReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
