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
      const { data } = await axios.get("/api/artwork");
      // localStorage.setItem("artworkList", JSON.stringify(data));
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

interface ArtworkPatrial {
  title: string;
  medium: string;
  dimensions: string;
  date: string;
}

export const editArtwork = (
  id: string,
  access_key: string,
  edit: ArtworkPatrial
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.ARTWORK_EDIT_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access_key}`,
      },
    };
    try {
      const { data } = await axios.put(
        `/api/edit-artwork/${id}`,
        {
          title: edit.title,
          medium: edit.medium,
          dimensions: edit.dimensions,
          date: edit.date,
        },
        config
      );
      // localStorage.setItem("artworkList", JSON.stringify(data));
      dispatch({
        type: ActionTypes.ARTWORK_EDIT_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: ActionTypes.ARTWORK_EDIT_FAIL,
        payload: err.message,
      });
    }
  };
};
