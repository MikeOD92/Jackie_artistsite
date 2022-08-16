import { ActionTypes } from "../action_types";
import { Action } from "../actions";

interface CreateUserState {
  loading: boolean;
  error: string | null;
  success: string;
}

const initialState = {
  loading: false,
  error: null,
  success: "",
};

const createUserReducer = (
  state: CreateUserState = initialState,
  action: Action
): CreateUserState => {
  switch (action.type) {
    case ActionTypes.USER_CREATE_REQUEST:
      return { loading: true, error: null, success: "" };
    case ActionTypes.USER_CREATE_SUCCESS:
      return { loading: true, error: null, success: action.payload };
    case ActionTypes.USER_CREATE_FAIL:
      return { loading: true, error: action.payload, success: "" };
    default:
      return state;
  }
};

export default createUserReducer;
