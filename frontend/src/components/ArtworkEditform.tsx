import React, { FC, SyntheticEvent, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";

import { useTypedSelector } from "../hooks/useTypedSelect";

import { ArtWork } from "../types/art_work";
import { ArtWorkMedia } from "../types/artwork_media";
import { useActions } from "../hooks/useActions";

const ArtworkEditform: FC<{
  id: string | undefined;
  artwork: ArtWork | undefined;
  media: ArtWorkMedia[];
}> = ({ id, artwork, media }) => {
  const user = useTypedSelector((state) => state.user);
  const artworkdata = useTypedSelector((state) => state.artwork);

  const { editArtwork } = useActions();

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
      editArtwork(
        id,
        title.current.value,
        medium.current.value,
        dimensions.current.value,
        date.current.value,
        user.access_key
      );
      if (artworkdata.error !== null) {
        setSuccess(true);
      } else {
        setSuccess(false);
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
