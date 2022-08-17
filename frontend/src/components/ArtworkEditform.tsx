import React, { FC, SyntheticEvent, useRef, useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useTypedSelector } from "../hooks/useTypedSelect";

import { ArtWorkMedia } from "../types/artwork_media";
import { useActions } from "../hooks/useActions";
import { ArtWork } from "../types/art_work";

const ArtworkEditform: FC<{
  id: string | undefined;
  redirect: Function;
  // media: ArtWorkMedia[];
  // artwork: ArtWork;
  // loading: Boolean;
}> = ({ id, redirect }) => {
  const { access_key } = useTypedSelector((state) => state.user);
  const { data, loading, error } = useTypedSelector(
    (state) => state.singleArtwork
  );
  // const { list, error, loading } = useTypedSelector(
  //   (state) => state.artworkList
  // );

  // const [artwork, setArtwork] = useState<ArtWork>();

  // useEffect(() => {
  //   if (list.length > 0) {
  //     const singleWork = list.filter(
  //       (item: ArtWork) => item.id.toString() === id
  //     );
  //     setArtwork(singleWork[0]);
  //     // this is maybe not great it's nice becasue it does not require an aditional call to api
  //     // but is messes up on refresh when the redux state for list no longer exists.
  //     // setMedia(singleWork[0].work_img);
  //   }

  // theres some kind of issue where changes aren't appearing in the form after edits are made
  // even though they are going through.
  // }, [list, id]);

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
      try {
        editArtwork(id, access_key, {
          title: title.current.value,
          medium: medium.current.value,
          dimensions: dimensions.current.value,
          date: date.current.value,
        });
        redirect(true);
      } catch (err) {
        console.error(err);
        redirect(false);
      }
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
            defaultValue={data?.title || ""}
            ref={title}
            className="defaultCursor"
            required
          />
          <Form.Control
            type="text"
            defaultValue={data?.medium || ""}
            className="defaultCursor"
            ref={medium}
          />
          <Form.Control
            type="text"
            defaultValue={data?.dimensions || ""}
            className="defaultCursor"
            ref={dimensions}
            required
          />
          <Form.Control
            type="text"
            defaultValue={data?.date || ""}
            className="defaultCursor"
            ref={date}
            required
          />
          {data ? (
            <Button
              style={{ backgroundColor: "black" }}
              type="submit"
              disabled={data.work_img?.length < 1}
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
