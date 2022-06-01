import React, { FC, SyntheticEvent, useRef, useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { selectUser } from "../store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Upload from "../components/Upload";
import { ArtWork } from "../types/art_work";
import { ArtWorkMedia } from "../types/artwork_media";

const EditArtwork: FC = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState<ArtWork>();

  const auth = useAuth();
  const user = useSelector(selectUser);

  const title = useRef<HTMLInputElement>(null);
  const medium = useRef<HTMLInputElement>(null);
  const dimensions = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<Array<string>>([]);
  const [media, setMedia] = useState<Array<ArtWorkMedia>>([]);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | undefined>(
    undefined
  );
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      const fetchData = await axios.get(
        `http://localhost:8000/api/artwork/${id}`
      );
      const data = await fetchData.data.data;
      setArtwork(data);
    };
    fetch();
  }, [id, uploadSuccess]);

  useEffect(() => {
    if (artwork) setMedia(artwork?.work_img);
  }, [artwork]);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user}`,
    },
  };

  const submission = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      title.current &&
      medium.current &&
      dimensions.current &&
      date.current &&
      images.length >= 1
    ) {
      const editArtwork = await axios.put(
        `http://localhost:8000/api/edit-artwork/${id}`,
        {
          title: title.current.value,
          medium: medium.current.value,
          dimensions: dimensions.current.value,
          date: date.current.value,
        },
        config
      );
      if (editArtwork.status === 200) {
        setSuccess(true);
      }
    }
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

  const deleteWork = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("delete", id);
    const deleteRequest = await axios.delete(
      `http://localhost:8000/api/edit-artwork/${id}`,
      config
    );
    if (deleteRequest.status === 204) {
      setRedirect(true);
    }
  };
  if (auth === false || redirect === true) {
    return <Navigate to="/" />;
  }
  return (
    <Container className="mt-5 p-5">
      <h1> Edit Artwork Data</h1>
      <Row className="mt-5">
        <Col md={6}>
          <Form
            onSubmit={(e: SyntheticEvent) => {
              submission(e);
            }}
          >
            <Form.Control
              type="text"
              defaultValue={artwork?.title || ""}
              ref={title}
              required
            />
            <Form.Control
              type="text"
              defaultValue={artwork?.medium || ""}
              ref={medium}
            />
            <Form.Control
              type="text"
              defaultValue={artwork?.dimensions || ""}
              ref={dimensions}
              required
            />
            <Form.Control
              type="text"
              defaultValue={artwork?.date || ""}
              ref={date}
              required
            />
            {artwork ? (
              <Button type="submit" disabled={artwork?.work_img.length < 1}>
                save
              </Button>
            ) : (
              ""
            )}
            {success === false ? (
              <p style={{ color: "red" }}> Error: Update Failed</p>
            ) : success === true ? (
              <p style={{ color: "green" }}> Update Successful</p>
            ) : (
              ""
            )}
          </Form>
        </Col>
        <Col lg={6}>
          <Form onSubmit={(e) => saveMedia(e)}>
            <Upload setImages={setImages} />
            {artwork ? (
              <>
                <Button
                  type="submit"
                  disabled={artwork?.work_img.length < 1 && images.length < 1}
                >
                  Save{" "}
                </Button>
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
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Button variant="outline-danger" onClick={(e) => deleteWork(e)}>
            {" "}
            DELETE
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EditArtwork;
