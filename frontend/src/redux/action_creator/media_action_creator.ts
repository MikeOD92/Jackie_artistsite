import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action_types";
import { Action } from "../actions";

export const createMedia = (token: string, id: string, images: string[]) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.MEDIA_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let mediaSuccess = [];
      for (let x in images) {
        const newMedia = await axios.post(
          "/api/artwork-media",
          {
            artwork: id,
            img: images[x],
          },
          config
        );
        mediaSuccess.push(newMedia.status);
      }
      if (mediaSuccess.indexOf(200) !== -1) {
        dispatch({
          type: ActionTypes.MEDIA_CREATE_SUCCESS,
          payload: "Success",
        });
      } else {
        dispatch({
          type: ActionTypes.MEDIA_CREATE_FAIL,
          payload: "failed to add media",
        });
      }
    } catch (err: any) {
      console.error(err);
      dispatch({
        type: ActionTypes.MEDIA_CREATE_FAIL,
        payload: err.message,
      });
    }
  };
};
export const removeMedia = (token: string, id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.MEDIA_DELETE_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`/api/artwork-media/${id}`, config);
      dispatch({
        type: ActionTypes.MEDIA_DELETE_SUCCESS,
        payload: "media delete success",
      });
    } catch (err: any) {
      console.error(err);
      dispatch({
        type: ActionTypes.MEDIA_DELETE_FAIL,
        payload: err.message,
      });
    }
  };
};
