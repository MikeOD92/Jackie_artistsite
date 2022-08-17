import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action_types";
import { Action } from "../actions";
import { ArtWork } from "../../types/art_work";

export const getArtworkList = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.ARTWORKLIST_REQUEST,
    });
    try {
      const { data } = await axios.get("http://localhost:8000/api/artwork");
      dispatch({
        type: ActionTypes.ARTWORKLIST_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: ActionTypes.ARTWORKLIST_FAIL,
        payload: err.message,
      });
    }
  };
};
