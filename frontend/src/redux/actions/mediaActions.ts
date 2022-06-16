import { ActionTypes } from "../action_types";

export interface mediaCreateAction {
  type: ActionTypes.MEDIA_CREATE_REQUEST;
}
export interface mediaCreateActionSuccess {
  type: ActionTypes.MEDIA_CREATE_SUCCESS;
  payload: string;
}
export interface mediaCreateActionFail {
  type: ActionTypes.MEDIA_CREATE_FAIL;
  payload: string;
}

export interface mediaDeleteAction {
  type: ActionTypes.MEDIA_DELETE_REQUEST;
}
export interface mediaDeleteActionSuccess {
  type: ActionTypes.MEDIA_DELETE_SUCCESS;
  payload: string;
}
export interface mediaDeleteActionFail {
  type: ActionTypes.MEDIA_DELETE_FAIL;
  payload: string;
}
