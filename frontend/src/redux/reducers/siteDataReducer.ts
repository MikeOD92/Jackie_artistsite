import { ActionTypes } from "../action_types";
import { Action } from "../actions";
import { SiteData } from "../../types/site_data";

interface PageData {
  loading: boolean;
  data: Array<SiteData>;
  error: string | null;
}

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const siteDataReducer = (
  state: PageData = initialState,
  action: Action
): PageData => {
  switch (action.type) {
    case ActionTypes.PAGEDATA_REQUEST:
      return { loading: true, error: null, data: [] };
    case ActionTypes.PAGEDATA_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionTypes.PAGEDATA_FAIL:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default siteDataReducer;
