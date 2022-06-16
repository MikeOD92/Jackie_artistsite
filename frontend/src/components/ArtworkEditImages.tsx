import React, { FC, SyntheticEvent, useEffect } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";

import axios from "axios";

import { useTypedSelector } from "../hooks/useTypedSelect";

import Upload from "../components/Upload";
import { ArtWork } from "../types/art_work";
import { ArtWorkMedia } from "../types/artwork_media";
import { useActions } from "../hooks/useActions";

const ArtworkEditImages: FC<{
  setImages: Function;
  id: string | undefined;
  uploadSuccess: boolean | undefined;
}> = ({ setImages, id, uploadSuccess }) => {
  // const user = useSelector(selectUser);
  const uploads = useTypedSelector((state) => state.upload);
  const { data, error, loading } = useTypedSelector((state) => state.artwork);
  const user = useTypedSelector((state) => state.user);
  const mediaState = useTypedSelector((state) => state.media);
  const { removeUpload, getArtSingleWork, createMedia, removeMedia } =
    useActions();

  useEffect(() => {
    removeUpload([]);
    if (id) {
      getArtSingleWork(id);
    }
  }, [mediaState]);

  const handleRemoveUpload = (e: SyntheticEvent, idx: number) => {
    e.preventDefault();
    if (uploads?.data.length === 1) {
      removeUpload([]);
    } else {
      let newset = uploads.data;
      newset.splice(idx, 1);
      removeUpload(newset);
    }
  };
  //////////////////
  const deleteMedia = async (e: SyntheticEvent, mediaId: number) => {
    const confirm = window.confirm("delete image?");
    if (confirm) {
      try {
        removeMedia(user.access_key, mediaId.toString());
        console.log(mediaId);
      } catch (err) {
        console.error(err);
      }
    }
  };
  //////////////////////////

  const saveMedia = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (id) {
      createMedia(user.access_key, id, uploads.data);
    }
  };

  return (
    <>
      <Form onSubmit={(e) => saveMedia(e)}>
        <Upload setImages={setImages} />
        {data ? (
          <>
            <Button
              style={{ backgroundColor: "black" }}
              type="submit"
              disabled={data?.work_img.length < 1 && uploads.data.length < 1}
            >
              Save{" "}
            </Button>
            {uploads.data.length > 0 ? (
              <p style={{ color: "orange" }}> you have unsaved images </p>
            ) : (
              ""
            )}
            <p>
              <small>* click to remove image</small>
            </p>
          </>
        ) : (
          ""
        )}
        {uploadSuccess === false ? (
          <p style={{ color: "red" }}> Error: upload Failed</p>
        ) : uploadSuccess === true ? (
          <p style={{ color: "green" }}> Media Update Successful</p>
        ) : (
          ""
        )}
      </Form>
      <Row className="mt-3">
        {data
          ? data.work_img.map((img) => {
              return (
                <Col md={4}>
                  <Image
                    src={img.img}
                    fluid
                    className="mb-3"
                    onClick={(e) => deleteMedia(e, img.id)}
                  />
                </Col>
              );
            })
          : ""}
        {uploads
          ? uploads.data.map((img, i) => {
              return (
                <Col md={4}>
                  <Image
                    src={img}
                    fluid
                    className="mb-3"
                    onClick={(e) => handleRemoveUpload(e, i)}
                  />
                </Col>
              );
            })
          : ""}
      </Row>
    </>
  );
};

export default ArtworkEditImages;
