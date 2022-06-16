import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action_types";
import { Action } from "../actions";

export const makeUpload = (token: string, files: FileList) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.UPLOAD_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      if (!files) return;
      let fileList = new FormData();

      for (let i = 0; i < files.length; i++) {
        fileList.append("image", files[i]);
      }
      const { data } = await axios.post("/api/upload", fileList, config);
      dispatch({
        type: ActionTypes.UPLOAD_SUCCESS,
        payload: data.data,
      });
    } catch (err: any) {
      console.error(err);
      dispatch({
        type: ActionTypes.UPLOAD_FAIL,
        payload: err.message,
      });
    }
  };
};

export const removeUpload = (newArr: string[]) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_UPLOAD_REQUEST,
    });
    try {
      dispatch({
        type: ActionTypes.REMOVE_UPLOAD_SUCCESS,
        payload: newArr,
      });
    } catch (err: any) {
      console.error(err);
      dispatch({
        type: ActionTypes.REMOVE_UPLOAD_FAIL,
        payload: err.message,
      });
    }
  };
};
