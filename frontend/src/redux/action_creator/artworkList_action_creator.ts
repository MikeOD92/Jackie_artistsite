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
        `http://localhost:8000/api/edit-artwork/${id}`,
        {
          title: edit.title,
          medium: edit.medium,
          dimensions: edit.dimensions,
          date: edit.date,
        },
        config
      );
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
            artwork: data[0].id,
            img: images[x],
          },
          config
        );
        console.log("////////// new media status");
        console.log(newMedia.status);
        mediaSuccess.push(newMedia.status);
      }
      if (mediaSuccess.indexOf(200) === -1) {
        await axios.delete(`/api/edit-artwork/${data.id}`, config);
        dispatch({
          type: ActionTypes.ARTWORK_CREATE_FAIL,
          payload: "error uploading media",
        });
      } else {
        dispatch({
          type: ActionTypes.ARTWORK_CREATE_SUCCESS,
          payload: data,
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
      const { data } = await axios.delete(`/api/edit-artwork/${id}`, config);
      dispatch({
        type: ActionTypes.ARTWORK_DELETE_SUCCESS,
        payload: data,
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
