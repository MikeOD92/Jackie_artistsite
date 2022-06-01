import React, { FC, SyntheticEvent, useRef, useState, useEffect } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";

import axios from "axios";
import { Navigate } from "react-router-dom";
import { selectUser } from "../store";
import { useSelector } from "react-redux";

import { ArtWork } from "../types/art_work";

const ArtworkEditform: FC<{
  id: string | undefined;
  images: string[];
  artwork: ArtWork | undefined;
}> = ({ id, images, artwork }) => {
  const user = useSelector(selectUser);

  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const title = useRef<HTMLInputElement>(null);
  const medium = useRef<HTMLInputElement>(null);
  const dimensions = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user}`,
    },
  };

  const submission = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (title.current && medium.current && dimensions.current && date.current) {
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
  return (
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
  );
};

export default ArtworkEditform;
