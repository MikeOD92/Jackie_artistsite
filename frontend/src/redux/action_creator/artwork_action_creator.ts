import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action_types";
import { Action } from "../actions";

export const getArtWorks = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.ARTWORKLIST_GET_REQUEST,
    });
    try {
      const { data } = await axios.get("/api/artwork");
      dispatch({
        type: ActionTypes.ARTWORKLIST_GET_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      console.error(err);
      dispatch({
        type: ActionTypes.ARTWORKLIST_GET_FAIL,
        payload: err.message,
      });
    }
  };
};

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

export const editArtwork = (
  id: string,
  title: string,
  medium: string,
  dimensions: string,
  date: string,
  token: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.ARTWORK_EDIT_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `/api/edit-artwork/${id}`,
        {
          title: title,
          medium: medium,
          dimensions: dimensions,
          date: date,
        },
        config
      );
      dispatch({
        type: ActionTypes.ARTWORK_EDIT_SUCCESS,
        payload: data.data,
      });
    } catch (err: any) {
      console.error(err);
      dispatch({
        type: ActionTypes.ARTWORK_EDIT_FAIL,
        payload: err,
      });
    }
  };
};

export const createArtwork = (
  title: string,
  medium: string,
  dimensions: string,
  date: string,
  images: string[],
  token: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.ARTWORK_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        "/api/create-artwork",
        {
          title: title,
          medium: medium,
          dimensions: dimensions,
          date: date,
        },
        config
      );

      const mediaSuccess = [];

      for (let x in images) {
        const newMedia = await axios.post(
          "/api/artwork-media",
          {
            artwork: data.id,
            img: images[x],
          },
          config
        );
        mediaSuccess.push(newMedia.status);
      }
      if (mediaSuccess.indexOf(200) === -1) {
        await axios.delete(`/api/edit-artwork/${data.id}`, config);
        dispatch({
          type: ActionTypes.ARTWORK_CREATE_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: ActionTypes.ARTWORK_CREATE_FAIL,
          payload: "error uploading media",
        });
      }
    } catch (err: any) {
      console.error(err);
      dispatch({
        type: ActionTypes.ARTWORK_CREATE_FAIL,
        payload: err,
      });
    }
  };
};

export const deleteArtwork = (id: string, token: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.ARTWORK_DELETE_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const deleteRequest = await axios.delete(
        `/api/edit-artwork/${id}`,
        config
      );
      dispatch({
        type: ActionTypes.ARTWORK_DELETE_SUCCESS,
        payload: {},
      });
    } catch (err: any) {
      console.error(err);
      dispatch({
        type: ActionTypes.ARTWORK_DELETE_FAIL,
        payload: err,
      });
    }
  };
};
