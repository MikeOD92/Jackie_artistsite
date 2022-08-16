import { ActionTypes } from "../action_types";

export interface createUserAction {
  type: ActionTypes.USER_CREATE_REQUEST;
}
export interface createUserActionSuccess {
  type: ActionTypes.USER_CREATE_SUCCESS;
  payload: string;
}
export interface createUserActionFail {
  type: ActionTypes.USER_CREATE_FAIL;
  payload: string;
}

/// Password update action

export interface passwordUpdateAction {
  type: ActionTypes.USER_EDIT_REQUEST;
}
export interface passwordUpdateActionSuccess {
  type: ActionTypes.USER_EDIT_SUCCESS;
  payload: string;
}
export interface passwordUpdateActionFail {
  type: ActionTypes.USER_EDIT_FAIL;
  payload: string;
}
