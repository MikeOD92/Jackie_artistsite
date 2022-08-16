import { ActionTypes } from "../action_types";
import { Action } from "../actions";
import { ArtWork } from "../../types/art_work";

interface ArtworkList {
  loading: boolean;
  list: Array<ArtWork>;
  error: string | null;
}

// let artworkListFromLocal = [];

// const localPortfolio = localStorage.getItem("artworkList");

// if (typeof localPortfolio === "string") {
//   artworkListFromLocal = JSON.parse(localPortfolio);
// }

const initialState = {
  loading: false,
  // list: artworkListFromLocal,
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
      return {
        loading: false,
        error: null,
        list: action.payload,
      };
    case ActionTypes.ARTWORKLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        list: [],
      };
    case ActionTypes.ARTWORK_EDIT_REQUEST:
      return { loading: true, error: null, list: state.list };
    case ActionTypes.ARTWORK_EDIT_SUCCESS:
      return {
        loading: false,
        error: null,
        list: action.payload,
      };
    case ActionTypes.ARTWORK_EDIT_FAIL:
      return {
        loading: false,
        error: action.payload,
        list: state.list,
      };
    case ActionTypes.ARTWORK_DELETE_REQUEST:
      return { loading: true, error: null, list: state.list };
    case ActionTypes.ARTWORK_DELETE_SUCCESS:
      return { loading: false, error: null, list: action.payload };
    case ActionTypes.ARTWORK_DELETE_FAIL:
      return { loading: true, error: action.payload, list: state.list };
    case ActionTypes.ARTWORK_CREATE_REQUEST:
      return { loading: true, error: null, list: state.list };
    case ActionTypes.ARTWORK_CREATE_SUCCESS:
      return { loading: true, error: null, list: action.payload };
    case ActionTypes.ARTWORK_CREATE_FAIL:
      return { loading: true, error: action.payload, list: state.list };
    default:
      return state;
  }
};

export default artworkListReducer;
