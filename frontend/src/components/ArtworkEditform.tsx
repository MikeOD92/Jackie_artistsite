import React, { FC, SyntheticEvent, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";

import axios from "axios";
import { selectUser } from "../redux/store";
import { useSelector } from "react-redux";

import { ArtWork } from "../types/art_work";
import { ArtWorkMedia } from "../types/artwork_media";

const ArtworkEditform: FC<{
  id: string | undefined;
  artwork: ArtWork | undefined;
  media: ArtWorkMedia[];
}> = ({ id, artwork, media }) => {
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
        `/api/edit-artwork/${id}`,
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
        className="defaultCursor"
        required
      />
      <Form.Control
        type="text"
        defaultValue={artwork?.medium || ""}
        className="defaultCursor"
        ref={medium}
      />
      <Form.Control
        type="text"
        defaultValue={artwork?.dimensions || ""}
        className="defaultCursor"
        ref={dimensions}
        required
      />
      <Form.Control
        type="text"
        defaultValue={artwork?.date || ""}
        className="defaultCursor"
        ref={date}
        required
      />
      {artwork ? (
        <Button
          style={{ backgroundColor: "black" }}
          type="submit"
          disabled={media?.length < 1}
        >
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
