import { ActionTypes } from "../action_types";
import { Action } from "../actions";
import { ArtWork } from "../../types/art_work";

interface ArtworkList {
  loading: boolean;
  list: Array<ArtWork>;
  error: string | null;
}

const initialState = {
  loading: false,
  list: [],
  error: "",
};

const artworkListReducer = (
  state: ArtworkList = initialState,
  action: Action
): ArtworkList => {
  switch (action.type) {
    case ActionTypes.ARTWORKLIST_REQUEST:
      return { loading: true, error: null, list: [] };
    case ActionTypes.ARTWORKLIST_SUCCESS:
      return { loading: false, error: null, list: action.payload };
    case ActionTypes.ARTWORKLIST_FAIL:
      return { loading: false, error: action.payload, list: [] };
    default:
      return state;
  }
};

export default artworkListReducer;
