import React, { FC, SyntheticEvent, useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelect";

import axios from "axios";
import { Navigate, Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { ArtWork } from "../types/art_work";
import { ArtWorkMedia } from "../types/artwork_media";
import ArtworkEditform from "../components/ArtworkEditform";
import ArtworkEditImages from "../components/ArtworkEditImages";

const EditArtwork: FC = () => {
  const { id } = useParams();

  const [artwork, setArtwork] = useState<ArtWork>();

  const auth = useAuth();
  // const user = useSelector(selectUser);
  const { access_key } = useTypedSelector((state) => state.user);
  const { data, error } = useTypedSelector((state) => state.artwork);

  const { getArtSingleWork, deleteArtwork } = useActions();

  const [images, setImages] = useState<Array<string>>([]);
  const [media, setMedia] = useState<Array<ArtWorkMedia>>([]);

  const [uploadSuccess, setUploadSuccess] = useState<boolean | undefined>(
    undefined
  );
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getArtSingleWork(id);
    }
    if (data) {
      setArtwork(data);
    }
  }, [id, uploadSuccess]);

  useEffect(() => {
    if (artwork) setMedia(artwork.work_img);
  }, [artwork]);

  const deleteWork = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (id) {
      deleteArtwork(id, access_key);
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
          <ArtworkEditform id={id} media={media} artwork={artwork} />
        </Col>
        <Col lg={6}>
          <ArtworkEditImages
            images={images}
            setImages={setImages}
            id={id}
            artwork={artwork}
            media={media}
            setMedia={setMedia}
            uploadSuccess={uploadSuccess}
            setUploadSuccess={setUploadSuccess}
          />
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
          <Link style={{ color: "black" }} to={`/${id}`}>
            Standard Artwork view
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default EditArtwork;
