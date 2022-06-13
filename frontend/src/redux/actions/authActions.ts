import { ActionTypes } from "../action_types";

export interface loginAction {
  type: ActionTypes.LOGIN_REQUEST;
}
export interface loginActionSuccess {
  type: ActionTypes.LOGIN_SUCCESS;
  payload: string;
}
export interface loginActionFail {
  type: ActionTypes.LOGIN_FAIL;
  payload: string;
}
export interface logoutAction {
  type: ActionTypes.LOGOUT;
}
