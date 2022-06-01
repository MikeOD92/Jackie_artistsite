import React, { FC, SyntheticEvent, useRef, useState } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { selectUser } from "../store";
import { useSelector } from "react-redux";

const NewArtwork: FC = () => {
  const auth = useAuth();
  const title = useRef<HTMLInputElement>(null);
  const medium = useRef<HTMLInputElement>(null);
  const dimensions = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);

  const mediaSuccess: number[] = [];

  const [images, setImages] = useState<Array<string>>([]);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const user = useSelector(selectUser);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user}`,
    },
  };

  const upload = async (files: FileList) => {
    if (!files) return;
    let data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("image", files[i]);
    }
    const uploaded = await axios.post(
      "http://localhost:8000/api/upload",
      data,
      config
    );
    setImages((images) => [...images, ...uploaded.data.data]);
  };

  const handleChange = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = (e.target as HTMLInputElement).files;
    if (data !== null) {
      upload(data);
    }
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
      const createdArtwork = await axios.post(
        "http://localhost:8000/api/create-artwork",
        {
          title: title.current.value,
          medium: medium.current.value,
          dimensions: dimensions.current.value,
          date: date.current.value,
        },
        config
      );
      if (createdArtwork.status === 200) {
        for (let x in images) {
          const newMedia = await axios.post(
            "http://localhost:8000/api/artwork-media",
            {
              artwork: createdArtwork.data.data.id,
              img: images[x],
            },
            config
          );
          mediaSuccess.push(newMedia.status);
        }
      } else {
        setSuccess(false);
      }
      if (mediaSuccess.indexOf(200) === -1) {
        await axios.delete(
          `http://localhost:8000/api/edit-artwork/${createdArtwork.data.data.id}`,
          config
        );
        setSuccess(false);
      } else {
        setSuccess(true);
      }
    } else {
      setSuccess(false);
    }
  };

  const removeUpload = (e: SyntheticEvent, idx: number) => {
    e.preventDefault();
    if (images.length === 1) {
      setImages([]);
    } else {
      let newset = images;
      newset.splice(idx, 1);
      console.log(newset);
      setImages([...newset]);
    }
  };

  if (auth === false || success === true) {
    return <Navigate to="/" />;
  }
  return (
    <Container className="mt-5 p-5">
      <h1> Add New Artworks</h1>
      <Row className="mt-5">
        <Col md={6}>
          <Form
            onSubmit={(e: SyntheticEvent) => {
              submission(e);
            }}
          >
            <Form.Control
              type="text"
              placeholder="title"
              ref={title}
              required
            />
            <Form.Control type="text" placeholder="medium" ref={medium} />
            <Form.Control
              type="text"
              placeholder="dimensions"
              ref={dimensions}
              required
            />
            <Form.Control type="text" placeholder="date" ref={date} required />
            <Form.Control
              type="file"
              placeholder="img upload"
              required
              multiple
              onChange={(e) => handleChange(e)}
            />

            <Button type="submit">save</Button>
            {success === false ? (
              <p style={{ color: "red" }}> Error: Artwork not created</p>
            ) : (
              ""
            )}
          </Form>
        </Col>
        <Col lg={6}>
          <Row>
            {images.length > 0 ? (
              <>
                <p>
                  <small>* click on image to remove</small>
                </p>
                {images.map((img, i) => {
                  console.log(i);
                  return (
                    <Col md={4} key={i}>
                      <Image
                        src={`http://localhost:8000${img}`}
                        fluid
                        className="mb-3"
                        onClick={(e) => removeUpload(e, i)}
                      />
                    </Col>
                  );
                })}
              </>
            ) : (
              ""
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default NewArtwork;
