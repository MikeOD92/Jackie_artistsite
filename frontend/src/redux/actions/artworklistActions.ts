import { ArtWork } from "../../types/art_work";
import { ActionTypes } from "../action_types";

export interface artworkListRequestAction {
  type: ActionTypes.ARTWORKLIST_REQUEST;
}
export interface artworkListSuccessAction {
  type: ActionTypes.ARTWORKLIST_SUCCESS;
  payload: Array<ArtWork>;
}
export interface artworkListFailAction {
  type: ActionTypes.ARTWORKLIST_FAIL;
  payload: string;
}
//edit artwork
export interface artworkEditRequestAction {
  type: ActionTypes.ARTWORK_EDIT_REQUEST;
}
export interface artworkEditSuccessAction {
  type: ActionTypes.ARTWORK_EDIT_SUCCESS;
  payload: Array<ArtWork>;
}
export interface artworkEditFailAction {
  type: ActionTypes.ARTWORK_EDIT_FAIL;
  payload: string;
}
//create artwork
export interface artworkCreateAction {
  type: ActionTypes.ARTWORK_CREATE_REQUEST;
}
export interface artworkCreateActionSuccess {
  type: ActionTypes.ARTWORK_CREATE_SUCCESS;
  payload: Array<ArtWork>;
}
export interface artworkCreateActionFail {
  type: ActionTypes.ARTWORK_CREATE_FAIL;
  payload: string;
}
// delete artwork
export interface artworkDeleteAction {
  type: ActionTypes.ARTWORK_DELETE_REQUEST;
}
export interface artworkDeleteActionSuccess {
  type: ActionTypes.ARTWORK_DELETE_SUCCESS;
  payload: Array<ArtWork>;
}
export interface artworkDeleteActionFail {
  type: ActionTypes.ARTWORK_DELETE_FAIL;
  payload: string;
}
