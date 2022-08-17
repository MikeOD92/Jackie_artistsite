import React, { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useTypedSelector } from "../hooks/useTypedSelect";

import { ArtWorkMedia } from "../types/artwork_media";
import { useActions } from "../hooks/useActions";
import { ArtWork } from "../types/art_work";
import axios from "axios";

const ArtworkEditform: FC<{
  id: string | undefined;
  media: ArtWorkMedia[];
  artwork: ArtWork;
  setArtwork: Function;
}> = ({ id, media, artwork, setArtwork }) => {
  const { access_key } = useTypedSelector((state) => state.user);

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<Boolean | undefined>();
  const [loading, setLoading] = useState<Boolean | undefined>();

  const title = useRef<HTMLInputElement>(null);
  const medium = useRef<HTMLInputElement>(null);
  const dimensions = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);

  useEffect(() => {}, [artwork]);

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
        setLoading(true);
        const data = await axios.put(
          `/api/edit-artwork/${id}`,
          {
            title: title.current.value,
            medium: medium.current.value,
            dimensions: dimensions.current.value,
            date: date.current.value,
          },
          config
        );
        // console.log("updated artwork state");
        // console.log(data.data);
        if (data.status === 200) {
          setArtwork(data.data.data);
          setSuccess(true);
          setLoading(false);
          console.log("setting so many things");
        }
      } catch (err: any) {
        setLoading(false);
        setError(err.message);
      }
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner animation="border" variant="light" />
      ) : artwork ? (
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
          {media ? (
            <Button
              style={{ backgroundColor: "black" }}
              type="submit"
              disabled={media.length < 0}
            >
              save
            </Button>
          ) : (
            ""
          )}
          {error ? <p style={{ color: "red" }}> Error: {error}</p> : ""}
          {success ? <p style={{ color: "green" }}> Update Successful</p> : ""}
        </Form>
      ) : (
        ""
      )}
    </div>
  );
};

export default ArtworkEditform;
