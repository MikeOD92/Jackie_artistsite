import React, { useState, useEffect, SyntheticEvent } from "react";
import { Container, Col, Row, Image } from "react-bootstrap";
import { ArtWork } from "../types/art_work";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ArtWorkMedia } from "../types/artwork_media";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { MdZoomIn, MdOutlineCancel } from "react-icons/md";
import DetailImage from "../components/DetailImage";
import { useTypedSelector } from "../hooks/useTypedSelect";

const ArtworkDetail = () => {
  const [artwork, setArtwork] = useState<ArtWork>();
  const [current, setCurrent] = useState<ArtWorkMedia | null>(null);
  const [zoomable, setZoomable] = useState<boolean>(false);
  const { id } = useParams();

  const handleClick = (img: ArtWorkMedia) => {
    return (event: React.MouseEvent) => {
      setCurrent(img);
      event.preventDefault();
    };
  };
  return (
    <div style={{ marginTop: "14vh" }}>
      <Row className="mb-4">
        <Col
          md={2}
          sm={12}
          xs={12}
          style={{ padding: "10px", marginLeft: "5vw" }}
        >
          <div style={{ textAlign: "left" }}>
            <h3 className="mt-5 title"> {artwork ? artwork.title : ""}</h3>
            <p className="mt-5 wall-txt"> {artwork ? artwork.medium : ""} </p>
            <p className="mt-4 wall-txt">
              {" "}
              {artwork ? artwork.dimensions : ""}
            </p>
            <p className="mt-4 wall-txt"> {artwork ? artwork.date : ""}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link
              to="/"
              style={{
                fontSize: "32px",
                color: "white",
                padding: "10px",
              }}
            >
              <IoReturnDownBackOutline />
            </Link>
            {zoomable ? (
              <div
                style={{
                  fontSize: "32px",
                  position: "relative",
                  padding: "10px",
                  left: "5vw",
                }}
                className="hide-on-shrink"
                onClick={(e: SyntheticEvent) => setZoomable(!zoomable)}
              >
                <MdOutlineCancel />
              </div>
            ) : (
              <div
                onClick={(e: SyntheticEvent) => setZoomable(!zoomable)}
                style={{
                  fontSize: "32px",
                  position: "relative",
                  padding: "10px",
                  left: "5vw",
                }}
              >
                <MdZoomIn className="hide-on-shrink" />
              </div>
            )}
          </div>
        </Col>
        <Col className="hide-on-shrink">
          {current ? <DetailImage img={current.img} zoomable={zoomable} /> : ""}
        </Col>
        <Col md={2} className="mt-3 flex-d">
          <Container className="mb-4">
            <Row>
              {artwork?.work_img
                ? artwork.work_img.map((img) => {
                    return (
                      <Col md={6} key={img.id}>
                        <Image
                          src={img.img}
                          fluid
                          onClick={handleClick(img)}
                          style={{ marginTop: "5px" }}
                          className="invert"
                        />
                      </Col>
                    );
                  })
                : ""}
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default ArtworkDetail;
