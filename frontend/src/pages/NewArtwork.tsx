import React, { FC, SyntheticEvent, useRef, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { selectUser } from "../store";
import { useSelector } from "react-redux";
import Upload from "../components/Upload";
import NewArrworkImages from "../components/NewArrworkImages";

const NewArtwork: FC = () => {
  const auth = useAuth();
  const user = useSelector(selectUser);

  const title = useRef<HTMLInputElement>(null);
  const medium = useRef<HTMLInputElement>(null);
  const dimensions = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<Array<string>>([]);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  let mediaSuccess: Number[] = [];

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
              className="defaultCursor"
              ref={title}
              required
            />
            <Form.Control
              type="text"
              placeholder="medium"
              className="defaultCursor"
              ref={medium}
            />
            <Form.Control
              type="text"
              placeholder="dimensions"
              className="defaultCursor"
              ref={dimensions}
              required
            />
            <Form.Control
              type="text"
              placeholder="date"
              className="defaultCursor"
              ref={date}
              required
            />
            <Upload setImages={setImages} />

            <Button style={{ backgroundColor: "black" }} type="submit">
              save
            </Button>
            {success === false ? (
              <p style={{ color: "red" }}> Error: Artwork not created</p>
            ) : (
              ""
            )}
          </Form>
        </Col>
        <Col lg={6}>
          <NewArrworkImages images={images} setImages={setImages} />
        </Col>
      </Row>
    </Container>
  );
};

export default NewArtwork;
