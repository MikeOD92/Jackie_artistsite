import { ActionTypes } from "../action_types";

export interface uploadAction {
  type: ActionTypes.UPLOAD_REQUEST;
}
export interface uploadActionSuccess {
  type: ActionTypes.UPLOAD_SUCCESS;
  payload: string[];
}
export interface uploadActionFail {
  type: ActionTypes.UPLOAD_FAIL;
  payload: string;
}
