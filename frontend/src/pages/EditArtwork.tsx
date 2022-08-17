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
  const { deleteArtwork } = useActions();
  const { access_key } = useTypedSelector((state) => state.user);
  const { list, loading, error } = useTypedSelector(
    (state) => state.artworkList
  );
  // console.log("list", list);
  // const siteData = useTypedSelector((state) => state.siteData);

  const [images, setImages] = useState<Array<string>>([]);
  // const [media, setMedia] = useState<Array<ArtWorkMedia>>([]);
  const [redirect, setRedirect] = useState<boolean>(false);

  const deleteWork = async (e: SyntheticEvent) => {
    try {
      if (id) {
        deleteArtwork(id, access_key);
      }
      if (!error) {
        setRedirect(true);
      }
    } catch (err) {
      console.error(err);
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
          <ArtworkEditform id={id} redirect={setRedirect} />
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
