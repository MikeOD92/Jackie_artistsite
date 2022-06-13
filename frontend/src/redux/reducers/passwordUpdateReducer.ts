import { ActionTypes } from "../action_types";
import { Action } from "../actions";

interface UpdatePassState {
  loading: boolean;
  error: string | null;
  success: string;
}

const initialState = {
  loading: false,
  error: null,
  success: "",
};
const updatePasswordReducer = (
  state: UpdatePassState = initialState,
  action: Action
): UpdatePassState => {
  switch (action.type) {
    case ActionTypes.USER_EDIT_REQUEST:
      return { loading: true, error: null, success: "" };
    case ActionTypes.USER_EDIT_SUCCESS:
      return { loading: true, error: null, success: action.payload };
    case ActionTypes.USER_EDIT_FAIL:
      return { loading: true, error: action.payload, success: "" };
    default:
      return state;
  }
};

export default updatePasswordReducer;
