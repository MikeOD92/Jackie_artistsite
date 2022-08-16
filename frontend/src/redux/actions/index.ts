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
  pageDataRequestAction,
  pageDataSuccessAction,
  pageDataFailAction,
} from "./siteDataActions";

import {
  artworkListRequestAction,
  artworkListSuccessAction,
  artworkListFailAction,
  artworkEditRequestAction,
  artworkEditSuccessAction,
  artworkEditFailAction,
  artworkDeleteAction,
  artworkDeleteActionSuccess,
  artworkDeleteActionFail,
  artworkCreateAction,
  artworkCreateActionSuccess,
  artworkCreateActionFail,
} from "./artworklistActions";

import {
  artworkGetAction,
  artworkGetActionSuccess,
  artworkGetActionFail,
} from "./singleArtworkAction";

import {
  uploadAction,
  uploadActionSuccess,
  uploadActionFail,
  removeUploadAction,
  removeUploadActionSuccess,
  removeUploadActionFail,
} from "./uploadActions";

import {
  mediaCreateAction,
  mediaCreateActionSuccess,
  mediaCreateActionFail,
  mediaDeleteAction,
  mediaDeleteActionSuccess,
  mediaDeleteActionFail,
} from "./ mediaActions";

export type Action =
  | loginAction
  | loginActionFail
  | loginActionSuccess
  | logoutAction
  | logoutAction
  | createUserAction
  | createUserActionFail
  | createUserActionSuccess
  | passwordUpdateAction
  | passwordUpdateActionFail
  | passwordUpdateActionSuccess
  | pageDataRequestAction
  | pageDataSuccessAction
  | pageDataFailAction
  | artworkListRequestAction
  | artworkListSuccessAction
  | artworkListFailAction
  | artworkEditRequestAction
  | artworkEditSuccessAction
  | artworkEditFailAction
  | artworkGetAction
  | artworkGetActionSuccess
  | artworkGetActionFail
  | artworkCreateAction
  | artworkCreateActionSuccess
  | artworkCreateActionFail
  | artworkDeleteAction
  | artworkDeleteActionSuccess
  | artworkDeleteActionFail
  | uploadAction
  | uploadActionSuccess
  | uploadActionFail
  | removeUploadAction
  | removeUploadActionSuccess
  | removeUploadActionFail
  | mediaCreateAction
  | mediaCreateActionSuccess
  | mediaCreateActionFail
  | mediaDeleteAction
  | mediaDeleteActionSuccess
  | mediaDeleteActionFail;
