import { ActionTypes } from "../action_types";
import { Action } from "../actions";
import { ArtWork } from "../../types/art_work";

interface ArtWorkListState {
  loading: boolean;
  error: string | null;
  data: ArtWork[];
}
const initialState = {
  loading: false,
  error: null,
  data: [],
};

const artworkListReducer = (
  state: ArtWorkListState = initialState,
  action: Action
): ArtWorkListState => {
  switch (action.type) {
    case ActionTypes.ARTWORKLIST_GET_REQUEST:
      return { loading: true, error: null, data: [] };
    case ActionTypes.ARTWORKLIST_GET_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionTypes.ARTWORKLIST_GET_FAIL:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default artworkListReducer;
