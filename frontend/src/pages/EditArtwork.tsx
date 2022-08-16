import React, { FC, SyntheticEvent, useState, useEffect } from "react";
import { Container, Button, Row, Col, Spinner } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { useTypedSelector } from "../hooks/useTypedSelect";

import axios from "axios";
import { Navigate, Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { ArtWork } from "../types/art_work";
import { ArtWorkMedia } from "../types/artwork_media";
import ArtworkEditform from "../components/ArtworkEditform";
import ArtworkEditImages from "../components/ArtworkEditImages";
import { useActions } from "../hooks/useActions";

const EditArtwork: FC = () => {
  const { id } = useParams();

  const [artwork, setArtwork] = useState<ArtWork>();

  const auth = useAuth();

  // const { fetchData, getArtworkList } = useActions();
  const { getArtworkList } = useActions();
  const { access_key } = useTypedSelector((state) => state.user);
  const { list, loading } = useTypedSelector((state) => state.artworkList);
  console.log("list", list);
  // const siteData = useTypedSelector((state) => state.siteData);

  const [images, setImages] = useState<Array<string>>([]);
  const [media, setMedia] = useState<Array<ArtWorkMedia>>([]);
  const [redirect, setRedirect] = useState<boolean>(false);

  // useEffect(() => {
  //   if (list.length <= 0) {
  //     getArtworkList();
  //   }
  // }, []);

  // it shouldnt matter if it's here becasue its in the header
  // and now it works fine?

  // useEffect(() => {
  //   if (list.length > 0) {
  //     const singleWork = list.filter(
  //       (item: ArtWork) => item.id.toString() === id
  //     );
  //     setArtwork(singleWork[0]);
  //     setMedia(singleWork[0].work_img);
  //   }

  //   // theres some kind of issue where changes aren't appearing in the form after edits are made
  //   // even though they are going through.
  // }, [list, id]);

  const deleteWork = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (id) {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${access_key}`,
        },
      };
      try {
        const deleteRequest = await axios.delete(
          `/api/edit-artwork/${id}`,
          config
        );
        if (deleteRequest.status === 204) {
          setRedirect(true);
        }
      } catch (err: any) {
        console.error(err);
      }
    }
  };

  if (auth === false || redirect === true) {
    return <Navigate to="/" />;
  }
  return (
    <Container className="mt-5 p-5">
      <h1> Edit Artwork Data</h1>
      <Row className="mt-5">
        <Col md={6}>
          {/* {artwork ? (
            // <ArtworkEditform id={id} media={media} artwork={artwork} /> */}
          <ArtworkEditform id={id} />
          {/* ) : (
            ""
          )} */}
        </Col>
        <Col lg={6}>
          {artwork ? (
            <ArtworkEditImages
              artwork={artwork}
              setImages={setImages}
              images={images}
              setArtwork={setArtwork}
              id={id}
            />
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Button variant="outline-danger" onClick={(e) => deleteWork(e)}>
            {" "}
            DELETE
          </Button>
        </Col>
        <Col md={3}>
          <Link style={{ color: "white" }} to={`/${id}`}>
            Standard Artwork view
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default EditArtwork;
