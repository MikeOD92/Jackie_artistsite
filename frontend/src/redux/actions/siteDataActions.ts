import { SiteData } from "../../types/site_data";
import { ActionTypes } from "../action_types";

export interface pageDataRequestAction {
  type: ActionTypes.PAGEDATA_REQUEST;
}
export interface pageDataSuccessAction {
  type: ActionTypes.PAGEDATA_SUCCESS;
  payload: Array<SiteData>;
}
export interface pageDataFailAction {
  type: ActionTypes.PAGEDATA_FAIL;
  payload: string;
}
