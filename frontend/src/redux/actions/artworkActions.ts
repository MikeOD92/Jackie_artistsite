import { ArtWork } from "../../types/art_work";
import { ActionTypes } from "../action_types";
/// get single artwork
export interface artworkGetAction {
  type: ActionTypes.ARTWORK_GET_REQUEST;
}
export interface artworkGetActionSuccess {
  type: ActionTypes.ARTWORK_GET_SUCCESS;
  payload: ArtWork;
}
export interface artworkGetActionFail {
  type: ActionTypes.ARTWORK_GET_FAIL;
  payload: string;
}
//create artwork
export interface artworkCreateAction {
  type: ActionTypes.ARTWORK_CREATE_REQUEST;
}
export interface artworkCreateActionSuccess {
  type: ActionTypes.ARTWORK_CREATE_SUCCESS;
  payload: ArtWork;
}
export interface artworkCreateActionFail {
  type: ActionTypes.ARTWORK_CREATE_FAIL;
  payload: string;
}
//edit artwork
export interface artworkEditAction {
  type: ActionTypes.ARTWORK_EDIT_REQUEST;
}
export interface artworkEditActionSuccess {
  type: ActionTypes.ARTWORK_EDIT_SUCCESS;
  payload: ArtWork;
}
export interface artworkEditActionFail {
  type: ActionTypes.ARTWORK_EDIT_FAIL;
  payload: string;
}
// delete artwork
export interface artworkDeleteAction {
  type: ActionTypes.ARTWORK_DELETE_REQUEST;
}
export interface artworkDeleteActionSuccess {
  type: ActionTypes.ARTWORK_DELETE_SUCCESS;
  payload: {};
}
export interface artworkDeleteActionFail {
  type: ActionTypes.ARTWORK_DELETE_FAIL;
  payload: string;
}
