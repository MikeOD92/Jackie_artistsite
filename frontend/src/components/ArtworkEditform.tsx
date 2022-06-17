import React, { FC, SyntheticEvent, useRef, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useTypedSelector } from "../hooks/useTypedSelect";

import { ArtWorkMedia } from "../types/artwork_media";
import { useActions } from "../hooks/useActions";
import { ArtWork } from "../types/art_work";

const ArtworkEditform: FC<{
  id: string | undefined;
  media: ArtWorkMedia[];
  artwork: ArtWork;
}> = ({ id, media, artwork }) => {
  const { access_key } = useTypedSelector((state) => state.user);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const title = useRef<HTMLInputElement>(null);
  const medium = useRef<HTMLInputElement>(null);
  const dimensions = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);

  const submission = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      id &&
      title.current &&
      medium.current &&
      dimensions.current &&
      date.current
    ) {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${access_key}`,
        },
      };
      try {
        const editResponse = await axios.put(
          `/api/edit-artwork/${id}`,
          {
            title: title.current.value,
            medium: medium.current.value,
            dimensions: dimensions.current.value,
            date: date.current.value,
          },
          config
        );
        if (editResponse.status === 200) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      } catch (err: any) {
        console.error(err);
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
          disabled={artwork.work_img?.length < 1}
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
