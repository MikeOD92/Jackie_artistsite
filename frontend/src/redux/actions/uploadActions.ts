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

export interface removeUploadAction {
  type: ActionTypes.REMOVE_UPLOAD_REQUEST;
}
export interface removeUploadActionSuccess {
  type: ActionTypes.REMOVE_UPLOAD_SUCCESS;
  payload: string[];
}
export interface removeUploadActionFail {
  type: ActionTypes.REMOVE_UPLOAD_FAIL;
  payload: string;
}
