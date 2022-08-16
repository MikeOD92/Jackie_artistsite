import { ActionTypes } from "../action_types";
import { Action } from "../actions";
import { ArtWork } from "../../types/art_work";

interface SingleArtworkState {
  loading: boolean;
  error: string | null;
  data: ArtWork | null;
}

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const SingleArtworkReducer = (
  state: SingleArtworkState = initialState,
  action: Action
): SingleArtworkState => {
  switch (action.type) {
    case ActionTypes.ARTWORK_GET_REQUEST:
      return { loading: true, error: null, data: null };
    case ActionTypes.ARTWORK_GET_SUCCESS:
      return { loading: true, error: null, data: action.payload };
    case ActionTypes.ARTWORK_GET_FAIL:
      return { loading: true, error: action.payload, data: null };
    default:
      return state;
  }
};

export default SingleArtworkReducer;
