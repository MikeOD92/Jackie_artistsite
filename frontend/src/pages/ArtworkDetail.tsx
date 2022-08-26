import React, { useState, useEffect, SyntheticEvent } from "react";
import { Container, Col, Row, Image } from "react-bootstrap";
import { ArtWork } from "../types/art_work";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ArtWorkMedia } from "../types/artwork_media";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { MdZoomIn, MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import DetailImage from "../components/DetailImage";

const ArtworkDetail = () => {
  const [artwork, setArtwork] = useState<ArtWork>();
  const [current, setCurrent] = useState<ArtWorkMedia | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        try {
          const { data } = await axios.get(
            `http://localhost:8000/api/artwork/${id}` /// be sure to change this back
          );
          setArtwork(data.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    if (artwork?.work_img) {
      setCurrent(artwork.work_img[0]);
    }
  }, [artwork]);

  const [zoomable, setZoomable] = useState<boolean>(false);

  const handleClick = (img: ArtWorkMedia) => {
    return (event: React.MouseEvent) => {
      setCurrent(img);
      event.preventDefault();
    };
  };
  return (
    <div style={{ marginTop: "14vh" }}>
      <Row className="mb-4">
        <Col md={2} sm={12} xs={12} className="leftCol">
          <div style={{ textAlign: "left" }}>
            <h3 className="mt-5 title"> {artwork ? artwork.title : ""}</h3>
            <p className="mt-5 wall-txt"> {artwork ? artwork.medium : ""} </p>
            <p className="mt-4 wall-txt">
              {" "}
              {artwork ? artwork.dimensions : ""}
            </p>
            <p className="mt-4 wall-txt"> {artwork ? artwork.date : ""}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexFlow: "flex-end",
            }}
          >
            <Link to="/" className="returnBtn">
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
