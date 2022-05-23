import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Row, Image } from "react-bootstrap";
import { ArtWork } from "../types/art_work";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ArtWorkMedia } from "../types/artwork_media";

const ArtworkDetail = () => {
  const [artwork, setArtwork] = useState<ArtWork>();
  const [current, setCurrent] = useState<ArtWorkMedia>();
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const fetchData = await axios.get(
        `http://localhost:8000/api/artwork/${id}`
      );
      const data = await fetchData.data.data;
      setArtwork(data);
      setCurrent(data.work_img[0]);
    };
    fetch();
  }, []);

  const handleClick = (img: ArtWorkMedia) => {
    return (event: React.MouseEvent) => {
      setCurrent(img);
      event.preventDefault();
    };
  };
  return (
    <Container style={{ marginTop: "10vh" }}>
      <Row>
        <Col md={8}>
          {current ? (
            <Image
              fluid
              src={`http://localhost:8000${current.img}`}
              style={{ maxHeight: "85vh" }}
            />
          ) : (
            ""
          )}
        </Col>
        <Col>
          <Link to="/">
            <p
              style={{
                position: "absolute",
                right: "20px",
                width: "25px",
                height: "25px",
              }}
            >
              X
            </p>
          </Link>

          <div style={{ textAlign: "left" }}>
            <h2 className="mt-3"> {artwork ? artwork.title : ""}</h2>
            <h4 className="mt-5"> {artwork ? artwork.medium : ""} </h4>
            <h4 className="mt-3"> {artwork ? artwork.dimensions : ""}</h4>
            <h4 className="mt-5"> {artwork ? artwork.date : ""}</h4>
          </div>
        </Col>
      </Row>

      <Row
        className="mt-3 flex-d"
        style={{ width: "50%", justifyContent: "space-evenly" }}
      >
        {artwork?.work_img
          ? artwork.work_img.map((img) => {
              return (
                <Col md={3} key={img.id}>
                  <Image
                    src={`http://localhost:8000${img.img}`}
                    fluid
                    style={{ height: "15vh", padding: "0", margin: "0" }}
                    onClick={handleClick(img)}
                  />
                </Col>
              );
            })
          : ""}
      </Row>
    </Container>
  );
};

export default ArtworkDetail;
