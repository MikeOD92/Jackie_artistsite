import { ActionTypes } from "../action_types";
import { Action } from "../actions";
// import { ArtWorkMedia } from "../../types/artwork_media";

interface MediaState {
  loading: boolean;
  error: string | null;
  data?: string;
}

const initialState = {
  loading: false,
  error: null,
};

const mediaStateReducer = (
  state: MediaState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.MEDIA_CREATE_REQUEST:
      return { loading: true, error: null };
    case ActionTypes.MEDIA_CREATE_SUCCESS:
      return { loading: true, error: null, data: action.payload };
    case ActionTypes.MEDIA_CREATE_FAIL:
      return { loading: true, error: action.payload };
    case ActionTypes.MEDIA_DELETE_REQUEST:
      return { loading: true, error: null };
    case ActionTypes.MEDIA_DELETE_SUCCESS:
      return { loading: true, error: null, data: action.payload };
    case ActionTypes.MEDIA_DELETE_FAIL:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};

export default mediaStateReducer;
