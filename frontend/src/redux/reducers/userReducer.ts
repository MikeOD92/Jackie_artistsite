import { ActionTypes } from "../action_types";
import { Action } from "../actions";

interface UserState {
  loading: boolean;
  error: string | null;
  access_key: string;
}

const access_key = localStorage.getItem("access_key")
  ? localStorage.getItem("access_key")
  : "";

const initialState = {
  loading: false,
  error: null,
  access_key: access_key || "",
};

const userReducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return { loading: true, error: null, access_key: "" };
    case ActionTypes.LOGIN_SUCCESS:
      return { loading: false, error: null, access_key: action.payload };
    case ActionTypes.LOGIN_FAIL:
      return { loading: false, error: action.payload, access_key: "" };
    case ActionTypes.LOGOUT:
      return { loading: true, error: null, access_key: "" };
    default:
      return state;
  }
};

export default userReducer;
