import React, { FC, SyntheticEvent, useRef, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { selectUser } from "../store";
import { useSelector } from "react-redux";
import Upload from "../components/Upload";
import MediaEdit from "../components/MediaEdit";

const EditArtwork: FC = () => {
  const auth = useAuth();
  const user = useSelector(selectUser);

  const title = useRef<HTMLInputElement>(null);
  const medium = useRef<HTMLInputElement>(null);
  const dimensions = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<Array<string>>([]);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  //   let mediaSuccess: Number[] = [];

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
        "http://localhost:8000/api/",
        {
          title: title.current.value,
          medium: medium.current.value,
          dimensions: dimensions.current.value,
          date: date.current.value,
        },
        config
      );
      if (editArtwork.status === 200) {
      }
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
            <Upload setImages={setImages} />

            <Button type="submit">save</Button>
            {success === false ? (
              <p style={{ color: "red" }}> Error: Artwork not created</p>
            ) : (
              ""
            )}
          </Form>
        </Col>
        <Col lg={6}>
          <MediaEdit images={images} setImages={setImages} />
        </Col>
      </Row>
    </Container>
  );
};

export default EditArtwork;
