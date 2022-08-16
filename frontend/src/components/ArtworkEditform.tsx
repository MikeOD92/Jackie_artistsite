import React, { FC, SyntheticEvent, useRef, useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useTypedSelector } from "../hooks/useTypedSelect";

import { ArtWorkMedia } from "../types/artwork_media";
import { useActions } from "../hooks/useActions";
import { ArtWork } from "../types/art_work";

const ArtworkEditform: FC<{
  id: string | undefined;
  // media: ArtWorkMedia[];
  // artwork: ArtWork;
}> = ({ id }) => {
  const { access_key } = useTypedSelector((state) => state.user);

  const { list, error, loading } = useTypedSelector(
    (state) => state.artworkList
  );

  const [artwork, setArtwork] = useState<ArtWork>();

  useEffect(() => {
    if (list.length > 0) {
      const singleWork = list.filter(
        (item: ArtWork) => item.id.toString() === id
      );
      setArtwork(singleWork[0]);
      // setMedia(singleWork[0].work_img);
    }

    // theres some kind of issue where changes aren't appearing in the form after edits are made
    // even though they are going through.
  }, [list, id]);

  const { editArtwork } = useActions();

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
      editArtwork(id, access_key, {
        title: title.current.value,
        medium: medium.current.value,
        dimensions: dimensions.current.value,
        date: date.current.value,
      });
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner animation="border" variant="light" />
      ) : (
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
          {error ? <p style={{ color: "red" }}> Error: {error}</p> : ""}
        </Form>
      )}
    </div>
  );
};

export default ArtworkEditform;
