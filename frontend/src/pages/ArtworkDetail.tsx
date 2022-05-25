import React, { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import { Container, Col, Row, Image } from "react-bootstrap";
import { ArtWork } from "../types/art_work";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ArtWorkMedia } from "../types/artwork_media";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { MdZoomIn, MdOutlineCancel } from "react-icons/md";
import DetailImage from "../components/DetailImage";

const ArtworkDetail = () => {
  const [artwork, setArtwork] = useState<ArtWork>();
  const [current, setCurrent] = useState<ArtWorkMedia>();
  const [zoomable, setZoomable] = useState<boolean>(false);
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
    <div style={{ marginTop: "10vh" }}>
      <Row className="mb-4">
        <Col md={2} className="mt-3 flex-d">
          <Container className="mb-4">
            <Row>
              {artwork?.work_img && artwork.work_img.length > 1
                ? artwork.work_img.map((img) => {
                    return (
                      <Col md={6} key={img.id}>
                        <Image
                          src={`http://localhost:8000${img.img}`}
                          fluid
                          onClick={handleClick(img)}
                          style={{ marginTop: "5px" }}
                        />
                      </Col>
                    );
                  })
                : ""}
            </Row>
          </Container>
        </Col>

        <Col>
          {current ? <DetailImage img={current.img} zoomable={zoomable} /> : ""}
        </Col>
        <Col md={3} style={{ padding: "0 0 0 10px" }}>
          <div style={{ textAlign: "left" }}>
            <h4 className="mt-5"> {artwork ? artwork.title : ""}</h4>
            <p className="mt-5"> {artwork ? artwork.medium : ""} </p>
            <p className="mt-4"> {artwork ? artwork.dimensions : ""}</p>
            <p className="mt-4"> {artwork ? artwork.date : ""}</p>
          </div>

          {zoomable ? (
            <MdOutlineCancel
              onClick={(e: SyntheticEvent) => setZoomable(!zoomable)}
              style={{ fontSize: "32px" }}
            />
          ) : (
            <MdZoomIn
              onClick={(e: SyntheticEvent) => setZoomable(!zoomable)}
              style={{ fontSize: "32px" }}
            />
          )}
          <Link
            to="/"
            style={{
              position: "relative",
              left: "10vw",
              fontSize: "32px",
              color: "black",
            }}
          >
            <IoReturnDownBackOutline />
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default ArtworkDetail;
