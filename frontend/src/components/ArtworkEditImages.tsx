import React, { FC, SyntheticEvent } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";

import axios from "axios";

import { selectUser } from "../store";
import { useSelector } from "react-redux";

import Upload from "../components/Upload";
import { ArtWork } from "../types/art_work";
import { ArtWorkMedia } from "../types/artwork_media";

const ArtworkEditImages: FC<{
  images: string[];
  setImages: Function;
  id: string | undefined;
  media: ArtWorkMedia[];
  setMedia: Function;
  uploadSuccess: boolean | undefined;
  setUploadSuccess: Function;
  artwork: ArtWork | undefined;
}> = ({
  images,
  setImages,
  id,
  media,
  setMedia,
  uploadSuccess,
  setUploadSuccess,
  artwork,
}) => {
  const user = useSelector(selectUser);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user}`,
    },
  };

  const removeUpload = (e: SyntheticEvent, idx: number) => {
    e.preventDefault();
    if (images.length === 1) {
      setImages([]);
    } else {
      let newset = images;
      newset.splice(idx, 1);
      setImages([...newset]);
    }
  };

  const deleteMedia = async (e: SyntheticEvent, mediaId: number) => {
    const confirm = window.confirm("delete image?");
    if (confirm) {
      try {
        await axios.delete(
          `http://localhost:8000/api/artwork-media/${mediaId}`,
          config
        );
      } catch (err) {
        console.error(err);
      } finally {
        const fetchData = await axios.get(
          `http://localhost:8000/api/artwork/${id}`
        );
        const data = await fetchData.data.data;
        setMedia(data.work_img);
      }
    }
  };

  const saveMedia = async (e: SyntheticEvent) => {
    e.preventDefault();
    let mediaSuccess = [];
    for (let x in images) {
      const newMedia = await axios.post(
        "http://localhost:8000/api/artwork-media",
        {
          artwork: id,
          img: images[x],
        },
        config
      );
      mediaSuccess.push(newMedia.status);
    }
    if (mediaSuccess.indexOf(200) !== -1) {
      setUploadSuccess(true);
      setImages([]);
    } else {
      setUploadSuccess(false);
    }
  };
  return (
    <>
      <Form onSubmit={(e) => saveMedia(e)}>
        <Upload setImages={setImages} />
        {artwork ? (
          <>
            <Button
              style={{ backgroundColor: "black" }}
              type="submit"
              disabled={artwork?.work_img.length < 1 && images.length < 1}
            >
              Save{" "}
            </Button>
            {images.length > 0 ? (
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
      <Row>
        {media
          ? media.map((img) => {
              return (
                <Col md={4}>
                  <Image
                    src={`http://localhost:8000${img.img}`}
                    fluid
                    className="mb-3"
                    onClick={(e) => deleteMedia(e, img.id)}
                  />
                </Col>
              );
            })
          : ""}
        {images
          ? images.map((img, i) => {
              return (
                <Col md={4}>
                  <Image
                    src={`http://localhost:8000${img}`}
                    fluid
                    className="mb-3"
                    onClick={(e) => removeUpload(e, i)}
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
