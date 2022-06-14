import React, { FC, SyntheticEvent, useRef, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelect";

import Upload from "../components/Upload";
import NewArrworkImages from "../components/NewArrworkImages";
import { useActions } from "../hooks/useActions";

const NewArtwork: FC = () => {
  const auth = useAuth();
  const user = useTypedSelector((state) => state.user);

  const { createArtwork } = useActions();

  const title = useRef<HTMLInputElement>(null);
  const medium = useRef<HTMLInputElement>(null);
  const dimensions = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<Array<string>>([]);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const submission = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (title.current && medium.current && dimensions.current && date.current) {
      createArtwork(
        title.current.value,
        medium.current.value,
        dimensions.current.value,
        date.current.value,
        images,
        user.access_key
      );
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
