import {
  loginAction,
  loginActionSuccess,
  loginActionFail,
  logoutAction,
} from "./authActions";
import {
  createUserAction,
  createUserActionFail,
  createUserActionSuccess,
  passwordUpdateAction,
  passwordUpdateActionFail,
  passwordUpdateActionSuccess,
} from "./userActions";
import {
  artworkListAction,
  artworkListActionSuccess,
  artworkListActionFail,
} from "./artworkListActions";
import {
  artworkGetAction,
  artworkGetActionSuccess,
  artworkGetActionFail,
  artworkCreateAction,
  artworkCreateActionSuccess,
  artworkCreateActionFail,
  artworkEditAction,
  artworkEditActionSuccess,
  artworkEditActionFail,
  artworkDeleteAction,
  artworkDeleteActionSuccess,
  artworkDeleteActionFail,
} from "./artworkActions";
import {
  getPageDataAction,
  getPageDataActionFail,
  getPageDataActionSuccess,
  editPageDataAction,
  editPageDataActionFail,
  editPageDataActionSuccess,
} from "./pageDataActions";
import {
  uploadAction,
  uploadActionSuccess,
  uploadActionFail,
} from "./uploadActions";

export type Action =
  | loginAction
  | loginActionFail
  | loginActionSuccess
  | logoutAction
  | createUserAction
  | createUserActionFail
  | createUserActionSuccess
  | passwordUpdateAction
  | passwordUpdateActionFail
  | passwordUpdateActionSuccess
  | artworkListAction
  | artworkListActionSuccess
  | artworkListActionFail
  | artworkGetAction
  | artworkGetActionSuccess
  | artworkGetActionFail
  | artworkCreateAction
  | artworkCreateActionSuccess
  | artworkCreateActionFail
  | artworkEditAction
  | artworkEditActionSuccess
  | artworkEditActionFail
  | artworkDeleteAction
  | artworkDeleteActionSuccess
  | artworkDeleteActionFail
  | getPageDataAction
  | getPageDataActionFail
  | getPageDataActionSuccess
  | editPageDataAction
  | editPageDataActionFail
  | editPageDataActionSuccess
  | uploadAction
  | uploadActionSuccess
  | uploadActionFail;
