import { SiteData } from "../../types/site_data";
import { ActionTypes } from "../action_types";

export interface getPageDataAction {
  type: ActionTypes.PAGEDATA_GET_REQUEST;
}
export interface getPageDataActionSuccess {
  type: ActionTypes.PAGEDATA_GET_SUCCESS;
  payload: SiteData;
}
export interface getPageDataActionFail {
  type: ActionTypes.PAGEDATA_GET_FAIL;
  payload: string;
}

export interface editPageDataAction {
  type: ActionTypes.PAGEDATA_EDIT_REQUEST;
}
export interface editPageDataActionSuccess {
  type: ActionTypes.PAGEDATA_EDIT_SUCCESS;
  payload: SiteData;
}
export interface editPageDataActionFail {
  type: ActionTypes.PAGEDATA_EDIT_FAIL;
  payload: string;
}
