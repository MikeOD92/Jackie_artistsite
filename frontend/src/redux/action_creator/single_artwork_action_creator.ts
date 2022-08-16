import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action_types";
import { Action } from "../actions";
import { ArtWork } from "../../types/art_work";

export const getArtSingleWork = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.ARTWORK_GET_REQUEST,
    });
    try {
      const { data } = await axios.get(`/api/artwork/${id}`);
      dispatch({
        type: ActionTypes.ARTWORK_GET_SUCCESS,
        payload: data.data,
      });
    } catch (err: any) {
      console.error(err);
      dispatch({
        type: ActionTypes.ARTWORK_GET_SUCCESS,
        payload: err.message,
      });
    }
  };
};
