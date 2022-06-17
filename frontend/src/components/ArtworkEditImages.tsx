import React, { FC, SyntheticEvent, useState } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";

import axios from "axios";

import { useTypedSelector } from "../hooks/useTypedSelect";

import Upload from "../components/Upload";
import { ArtWork } from "../types/art_work";
import { ArtWorkMedia } from "../types/artwork_media";

const ArtworkEditImages: FC<{
  setImages: Function;
  images: string[];
  id: string | undefined;
  artwork: ArtWork;
  setArtwork: Function;
}> = ({ setImages, images, id, artwork, setArtwork }) => {
  const { access_key } = useTypedSelector((state) => state.user);

  const [uploadSuccess, setUploadSuccess] = useState<boolean | undefined>();

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${access_key}`,
    },
  };

  const handleRemoveUpload = (e: SyntheticEvent, idx: number) => {
    e.preventDefault();
    if (images && images.length === 1) {
      setImages([]);
    } else if (images) {
      let newset = images;
      newset.splice(idx, 1);
      setImages(newset);
    }
  };

  //////////////////
  const deleteMedia = async (e: SyntheticEvent, mediaId: number) => {
    e.preventDefault();
    const confirm = window.confirm("delete image?");
    if (confirm)
      try {
        await axios.delete(`/api/artwork-media/${mediaId}`, config);
        const { data } = await axios.get(`/api/artwork/${id}`);
        setArtwork(data.data);
      } catch (err: any) {
        console.error(err);
      }
  };

  //////////////////////////

  const saveMedia = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (id) {
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
          const { data } = await axios.get(`/api/artwork/${id}`);
          setImages([]);
          setArtwork(data.data);
          setUploadSuccess(true);
        }
      } catch (err: any) {
        console.error(err);
        setUploadSuccess(false);
      }
    }
  };

  return (
    <>
      <Form onSubmit={(e) => saveMedia(e)}>
        <Upload setUpload={setImages} />
        {artwork ? (
          <>
            <Button
              style={{ backgroundColor: "black" }}
              type="submit"
              disabled={
                artwork?.work_img.length < 1 && images && images?.length < 1
              }
            >
              Save{" "}
            </Button>
            {images && images?.length > 0 ? (
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
        {artwork
          ? artwork.work_img.map((img: ArtWorkMedia) => {
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
        {images
          ? images.map((img, i) => {
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
