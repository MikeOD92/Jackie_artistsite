import { ActionTypes } from "../action_types";
import { Action } from "../actions";
import { ArtWork } from "../../types/art_work";

interface ArtWorkState {
  loading: boolean;
  error: string | null;
  data: ArtWork | null;
}
const initialState = {
  loading: false,
  error: null,
  data: null,
};

const artworkReducer = (
  state: ArtWorkState = initialState,
  action: Action
): ArtWorkState => {
  switch (action.type) {
    case ActionTypes.ARTWORK_GET_REQUEST:
      return { loading: true, error: null, data: null };
    case ActionTypes.ARTWORK_GET_SUCCESS:
      return { loading: true, error: null, data: action.payload };
    case ActionTypes.ARTWORK_GET_FAIL:
      return { loading: true, error: action.payload, data: null };
    case ActionTypes.ARTWORK_CREATE_REQUEST:
      return { loading: true, error: null, data: null };
    case ActionTypes.ARTWORK_CREATE_SUCCESS:
      return { loading: true, error: null, data: action.payload };
    case ActionTypes.ARTWORK_CREATE_FAIL:
      return { loading: true, error: action.payload, data: null };
    case ActionTypes.ARTWORK_EDIT_REQUEST:
      return { loading: true, error: null, data: null };
    case ActionTypes.ARTWORK_EDIT_SUCCESS:
      return { loading: true, error: null, data: action.payload };
    case ActionTypes.ARTWORK_EDIT_FAIL:
      return { loading: true, error: action.payload, data: null };
    case ActionTypes.ARTWORK_DELETE_REQUEST:
      return { loading: true, error: null, data: null };
    case ActionTypes.ARTWORK_DELETE_SUCCESS:
      return { loading: true, error: null, data: null };
    case ActionTypes.ARTWORK_DELETE_FAIL:
      return { loading: true, error: action.payload, data: null };
    default:
      return state;
  }
};

export default artworkReducer;
