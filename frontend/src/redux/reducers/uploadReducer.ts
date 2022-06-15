import { ActionTypes } from "../action_types";
import { Action } from "../actions";

interface UploadState {
  loading: boolean;
  error: string | null;
  data: string[];
}

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const uploadReducer = (
  state: UploadState = initialState,
  action: Action
): UploadState => {
  switch (action.type) {
    case ActionTypes.UPLOAD_REQUEST:
      return { loading: true, error: null, data: [] };
    case ActionTypes.UPLOAD_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionTypes.UPLOAD_FAIL:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default uploadReducer;
