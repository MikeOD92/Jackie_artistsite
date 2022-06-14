import { ActionTypes } from "../action_types";
import { Action } from "../actions";
import { SiteData } from "../../types/site_data";

interface PageDataState {
  loading: boolean;
  error: string | null;
  data?: SiteData;
}

const initialState = {
  loading: false,
  error: null,
};

const pageDataReducer = (
  state: PageDataState = initialState,
  action: Action
): PageDataState => {
  switch (action.type) {
    case ActionTypes.PAGEDATA_GET_REQUEST:
      return { loading: true, error: null };
    case ActionTypes.PAGEDATA_GET_SUCCESS:
      return { loading: true, error: null, data: action.payload };
    case ActionTypes.PAGEDATA_GET_FAIL:
      return { loading: true, error: action.payload };
    case ActionTypes.PAGEDATA_EDIT_REQUEST:
      return { loading: true, error: null };
    case ActionTypes.PAGEDATA_EDIT_SUCCESS:
      return { loading: true, error: null, data: action.payload };
    case ActionTypes.PAGEDATA_EDIT_FAIL:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};

export default pageDataReducer;
